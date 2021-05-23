import React, { useEffect, useState } from "react";
import "./style2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import AllTopics from "./AllTopics";
import Login from "./Login";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import AllComments from "./Comments";



const Header = ({ isLoggedIn, loginMsg, isAdmin, loginName }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" id="header">
        <Navbar.Brand as={NavLink} to="/">DAT4SEM Security</Navbar.Brand> {/* Skal fixes da man bliver logget ud */}
        <Nav className="mr-auto">

          <NavLink className="nav-link" exact activeClassName="selected" href="/" to="/">
            Home
        </NavLink>

          <NavLink className="nav-link" exact activeClassName="selected" to="/topics">
            Topics
        </NavLink>

          {isAdmin && (
            <>
              <li>
                <NavLink className="nav-link" activeClassName="selected" to="/admin">
                  Admin
            </NavLink>
              </li>
            </>
          )}
          <NavLink className="nav-link" activeClassName="selected" to="/login-out">
            {loginMsg}
          </NavLink>
          {isLoggedIn && (
            <>
              <li className="floatRight">
                <span>Logged in as {loginName}</span>
              </li>
            </>
          )}
        </Nav>

      </Navbar>
    </>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginName, setLoginName] = useState('');

  let history = useHistory();

  const setLoginStatus = (status, name) => {
    setIsLoggedIn(status);
    setLoginName(name);
    history.push("/");
  };

  const setAdminStatus = (status) => {
    setIsAdmin(status);
    history.push("/");
  };

  return (


    <div>

      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        loginName={isLoggedIn ? loginName : ''}
      />

      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/topics">
            <Topics />
          </Route>
          <Route exact path="/comments">
            <Comments
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
            />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/login-out">
            <Login
              loginMsg={isLoggedIn ? "Logout" : "Login"}
              isLoggedIn={isLoggedIn}
              setLoginStatus={setLoginStatus}
              setAdminStatus={setAdminStatus}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div className="pageContent">
      <h2>Home</h2>
      <p>Welcome to this humble site for discussions. <br />
      In the <NavLink exact activeClassName="selected" to="/topics">
            topics
        </NavLink> page you can participate in discussions within certain, pre-selected subjects.<br />
      Please note, that a user is required in order to comment and post pictures (No other files allowed!)
      </p>

      {useEffect(() => {
        console.warn("############################################################\nIf anyone told you to enter anything in here, don't! They are trying to scam you\n##############################################################")
      }, [])}

    </div>
  );
}

function Topics() {
  return (
    <div className="pageContent">
      <AllTopics />
    </div>
  );
}

function Comments({ isLoggedIn, isAdmin }) {
  return (
    <div className="pageContent">
      <AllComments
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />
    </div>
  );
}

function Admin() {
  return (
    <div className="pageContent">
      <h2>Admin</h2>
    </div>
  );
}

