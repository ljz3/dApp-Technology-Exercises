import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { storage, db } from "../../firebase"
import baseImg from "../../resources/personicon.png"

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [userImg, setUserImg] = useState(null);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const handleChange = e => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }
  
  function addProfilePic(url){
    db.collection("users").doc(currentUser.email).update({
        picture: url
    })
  }

  const handleProfilePicture = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url =>{
            // console.log(url)
            setUrl(url);
            getImg();
            addProfilePic(url);
          });
      }
    );
  };

  useEffect(() =>{
    getImg();
  }, []);

  const getImg = async() => {
    // console.log(db.collection("users").doc(currentUser.email).get().data())
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

  // const getImg = async() => {
  //   await firestore().collection("users").doc(currentUser.email)
  // }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <img src={userImg || url || baseImg} style={{width: "350px", height: "350px"}} />
          <br/>
          <br/>
          <p><b>Change Picture</b></p>
          <input type="file" onChange={handleChange}></input>
          <Button className="btn btn-primary w-100 mt-3" onClick={handleProfilePicture}>Upload</Button>
          <Link to="/update-credentials" className="btn btn-secondary w-100 mt-3">
            Update Credentials
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  )
}
