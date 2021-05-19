import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { headerOrigin, addFriend } from "./settings";
const owaspPasswordChecker = require('owasp-password-strength-test');

owaspPasswordChecker.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 10,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4,
})


//Disable password submit
//check the password on useEffect
//Output any errors
//Enable the submit if there are no errors


function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const AddUser = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [userCreated, setUserCreated] = useState("");
  const [addUserButton, setUserButtonDisabled] = useState("true");
  let [passwordErrors, setPasswordErrors] = useState([]);


  const checkPassword = () => {
    let pwd = document.getElementById("passwordField").value;
/* DEBUG */ console.log(pwd);
    let pwdCheck = owaspPasswordChecker.test(pwd);
    setPasswordErrors(pwdCheck.errors);
/* DEBUG  */console.log("pw length: " + pwd.length);
/* DEBUG  */console.log("error length: " + passwordErrors.length);
    if (passwordErrors.length >= 1 || pwd.length < 10) {
      setUserButtonDisabled("true");
/* DEBUG */ console.log(passwordErrors);
    } else if (passwordErrors.length < 1 && pwd.length >= 10) {
      setUserButtonDisabled(""); //Empty means enabled
    }
  }

  const perfomAddUser = (evt) => {
    evt.preventDefault();

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": "",
        "origin": + headerOrigin
      },
      body: JSON.stringify({
        email: document.getElementById("userName").value,
        password: document.getElementById("userPassword").value,
        phone: document.getElementById("userPhone").value,
        firstName: document.getElementById("userFirstName").value,
        lastName: document.getElementById("userLastName").value
      })
    };

    fetch(addFriend, options)
      .then(handleHttpErrors)
      .then((res) => {
        console.log(res);
        setErrorMessage("");
        setUserCreated("created");
        console.log("User added");
      })
      .catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message);
          console.log("error: ", err);
        });
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h2 className="ca3White">Sign up</h2>
            <Form className="mt-4">
              <Form.Group controlId="userName">
                {userCreated === "created" ? (
                  <div className="alert alert-success" role="alert">
                    You've created a user, login above.
                  </div>
                ) : (
                  ""
                )}
                <Form.Label className="ca3White">Username (email)</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>
              <Form.Group id="userPassword">
                <Form.Label className="ca3White">Password</Form.Label>
                <Form.Control id="passwordField" onKeyUp={checkPassword} type="password" placeholder="Enter password" />
              </Form.Group>

              <Form.Group controlId="userPhone">
                <Form.Label className="ca3White">Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" />
              </Form.Group>

              <Form.Group controlId="userFirstName">
                <Form.Label className="ca3White">First name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" />
              </Form.Group>

              <Form.Group controlId="userLastName">
                <Form.Label className="ca3White">Last name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" />
              </Form.Group>

              <Button onClick={perfomAddUser} id="addUserButton" disabled={addUserButton} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <p className="mt-4 text-danger">{errorMessage}</p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddUser
