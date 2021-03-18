import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useState } from 'react';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


function App() {
  const [user, setUser] = useState({});
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var gitProvider = new firebase.auth.GithubAuthProvider();




  const handleSignInGoogle = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
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
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);

      });
  }

  const handleSingInFb = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        var user = result.user;

        var accessToken = credential.accessToken;
        setUser(user)

      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);


        // ...
      });
  }

  const handleSingInGithub = () => {
    firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        var token = credential.accessToken;

        var user = result.user;
        setUser(user)
        console.log('login with github', user);

      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);

      });
  }

  return (
    <div className="App">
      <button onClick={handleSignInGoogle}> Sign in with Google</button>
      <br />
      <br />
      <button onClick={handleSingInFb}>Sign in with Facebook</button>
      <br />
      <br />
      <button onClick={handleSingInGithub}>Sign in with Github</button>


      <h3>Name: {user.displayName}</h3>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
      <br />
    </div>
  );
}

export default App;
