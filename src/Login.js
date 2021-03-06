import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import AddUser from "./AddUser"


const recaptchaRef = React.createRef();

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();

    recaptchaRef.current.execute();

    login(loginCredentials.username, loginCredentials.password);
  }

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
          </Col>
          <Col>
            <h2>Login</h2>
            <Form onChange={onChange} className="mt-4">


              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lf_WMMaAAAAAJNxTTRrA0bmDv5VVmzRzBIKYcWJ"
                size="invisible"
                onChange={onChange}
              />


              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" id="username" placeholder="Enter email" />
              </Form.Group>
              <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" placeholder="Enter password" />
              </Form.Group>
              <Button onClick={performLogin} variant="primary" type="submit">
                Login
                </Button>
            </Form>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </div>
  )

}

function LoggedIn() {

  function parseJwt(token) {
    let tokenDecoded = JSON.parse(atob(token.split('.')[1]));
    return tokenDecoded.roles.split(',')[0];
  }

  const [dataFromServer, setDataFromServer] = useState("Loading...")
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let role = parseJwt(facade.getToken());
    facade.fetchData(role).then(data => setDataFromServer(data.msg))
      .catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message);
          console.log("error: ", err);
        })
      }
      )
  }, [])

  return (
    <div>
      <h1 className="display-4 text-muted">Data Received from server</h1>
      <h3>{dataFromServer}</h3>
      <p className="mt-4 text-danger">{errorMessage}</p>
    </div>
  )

}

function Login({ setLoginStatus, isLoggedIn, setAdminStatus }) {

  let header = document.getElementById("header");

  const parseJwt = (token) => {
    let tokenDecoded = JSON.parse(atob(token.split('.')[1]));
    return tokenDecoded.roles.split(',')[0];
  }

  function parseJwtName(name) {
    let tokenName = JSON.parse(atob(name.split('.')[1]));
    return tokenName.userAlias;
  }

  const [errorMessage, setErrorMessage] = useState('')

  const logout = () => {
    facade.logout()
    setLoginStatus(false)
    setAdminStatus(false)
    header.classList.remove("adminStyle")
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then((res) => {
        setErrorMessage('')
        let name = parseJwtName(facade.getToken());
        setLoginStatus(true, name)

        if (parseJwt(facade.getToken()) === "admin") {
          setAdminStatus(true)
          header.classList.add("adminStyle");
        }

      }).catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message)
          console.log("error: ", err)
        })
      });
  };


  return (
    <div className="pageContent">
      {!isLoggedIn ? (
        <>
          <LogIn login={login} />
          <Container>
            <Row>
              <Col>
              </Col>
              <Col>
                <p className="mt-4 text-danger">{errorMessage}</p>
              </Col>
              <Col>
              </Col>
            </Row>
          </Container>
          <br />
          <AddUser />
        </>
      ) :
        (<div>
          <LoggedIn />

          <Button variant="secondary" onClick={logout}>Logout</Button>

        </div>)}
    </div>
  )

}

export default Login;

