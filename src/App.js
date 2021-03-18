import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState({});
  var provider = new firebase.auth.GoogleAuthProvider();


  const handleSignInGoogle = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user)

      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The emailof the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  return (
    <div className="App">
      <button onClick={handleSignInGoogle}> Sign in with Google</button>
      <h3>Name: {user.displayName}</h3>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
