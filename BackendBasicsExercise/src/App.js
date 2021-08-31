import React from "react";
import Signup from "./components/signup/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Lobby from "./components/Lobby/Lobby";
import PrivateRoute from "./PrivateRoute";
import UpdateCredentials from "./components/UpdateCredentials/UpdateCredentials";
import NavigationBar from "./components/Navbar/NavigationBar";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
        <Router>
          <AuthProvider>
          <NavigationBar/>
            <Switch>
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/update-credentials" component={UpdateCredentials} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login}/>
              <PrivateRoute path="/">
                <Lobby/>
              </PrivateRoute>
            </Switch>
          </AuthProvider>
        </Router>
    </Container>
  )
}

export default App
