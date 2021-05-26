import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { addFriend } from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

const AddUser = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userCreated, setUserCreated] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    //data.preventDefault();

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName
      })
    };

    fetch(addFriend, options)
      .then(handleHttpErrors)
      .then((res) => {
        setErrorMessage("");
        setUserCreated("created");
        reset();
      })
      .catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message);
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
            <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="userEmail">
                {userCreated === "created" ? (
                  <div className="alert alert-success" role="alert">
                    You've created a user, login above.
                  </div>
                ) : (
                  ""
                )}
                <Form.Label className="ca3White">Email</Form.Label>
                <Form.Control type="text" placeholder="Enter email" {...register("email", { required: "This is required", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'Has to be a real email' } })} />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
              </Form.Group>

              <Form.Group controlId="userName">
                <Form.Label className="ca3White">Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" {...register("username", { required: "This is required", minLength: { value: 2, message: 'Minimum 2 character' }, maxLength: { value: 20, message: 'Maximum 20 character' }, pattern: { value: /^[a-zA-Z0-9_-]*$/, message: 'No special characters allowed' } })} />
                {errors.username && <p className="text-danger">{errors.username.message}</p>}
              </Form.Group>

              <Form.Group controlId="userPassword">
                <Form.Label className="ca3White">Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" {...register("password", { required: "This is required", minLength: { value: 6, message: 'Minimum 6 character' }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{6,}/, message: 'Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character' } })} />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
              </Form.Group>

              <Form.Group controlId="userPhone">
                <Form.Label className="ca3White">Phone</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone number" {...register("phone", { required: "This is required", maxLength: { value: 15, message: 'Maximum 15 character' }, pattern: { value: /^\+?\d*$/, message: 'Has to be a number' } })} />
                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
              </Form.Group>

              <Form.Group controlId="userFirstName">
                <Form.Label className="ca3White">First name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" {...register("firstName", { required: "This is required", maxLength: { value: 80, message: 'Maximum 80 character' }, pattern: { value: /^[a-zA-Z0-9_-]*$/, message: 'No special characters allowed' } })} />
                {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
              </Form.Group>

              <Form.Group controlId="userLastName">
                <Form.Label className="ca3White">Last name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" {...register("lastName", { required: "This is required", maxLength: { value: 100, message: 'Maximum 100 character' }, pattern: { value: /^[a-zA-Z0-9_-]*$/, message: 'No special characters allowed' } })} />
                {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
              </Form.Group>

              <Button variant="primary" type="submit">
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
