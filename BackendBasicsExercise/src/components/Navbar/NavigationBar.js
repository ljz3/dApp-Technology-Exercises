import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { storage, db } from "../../firebase"
import { Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';
import baseImg from "../../resources/personicon.png"

export default function NavigationBar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [userImg, setUserImg] = useState(null);


  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Logout error");
    }
  }

  useEffect(() =>{
    getImg();
  }, []);

  const getImg = async() => {
    // console.log(db.collection("users").doc(currentUser.email).get().data())
    if(currentUser){
      const userRef = db.collection("users").doc(currentUser.email);
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        // console.log('Document data:', doc.data().picture);
        // return doc.data().picture;
        setUserImg(doc.data().picture);
      }
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
      {currentUser && <img src={userImg || baseImg} style={{width: "50px", height: "50px", marginRight: "15px"}} />}
      <div>{currentUser && currentUser.email}</div>
    </Navbar>
    
  );

}