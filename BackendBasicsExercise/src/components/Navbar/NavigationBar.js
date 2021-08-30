import React from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';

export default function NavigationBar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Logout error");
    }
  }

  return(            
      <Navbar bg="navbar navbar-expand-sm bg-light fixed-top" variant="light">
      
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/lobby">Lobby</Nav.Link>
          {!currentUser && <Nav.Link href="/login">Login</Nav.Link>}
          {!currentUser && <Nav.Link href="/signup">Sign up</Nav.Link>}
          {currentUser && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          {currentUser && <Nav.Link href="/profile">Profile</Nav.Link>}
        </Nav>
      </Container>
      <div>{currentUser && currentUser.email}</div>
    </Navbar>
    
  );

}