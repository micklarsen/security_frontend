import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { URL, addFriend, url2 } from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const AddUser = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userCreated, setUserCreated] = useState("");

  const perfomAddUser = (evt) => {
    evt.preventDefault();

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: document.getElementById("userEmail").value,
        username: document.getElementById("userName").value,
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
  console.log("err: " + errorMessage);
  console.log("userCreated: " + userCreated);
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h2 className="ca3White">Sign up</h2>
            <Form className="mt-4">
              <Form.Group controlId="userEmail">
                {userCreated === "created" ? (
                  <div className="alert alert-success" role="alert">
                    You've created a user, login above.
                  </div>
                ) : (
                  ""
                )}
                <Form.Label className="ca3White">email</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="userName">
                <Form.Label className="ca3White">Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group controlId="userPassword">
                <Form.Label className="ca3White">Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
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

              <Button onClick={perfomAddUser} variant="primary" type="submit">
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
