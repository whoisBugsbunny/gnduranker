  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
      apiKey: "AIzaSyDswRp2CSZXfjjro-by_4ohqfYDw5mn54M",
      authDomain: "ranker-704af.firebaseapp.com",
      databaseURL: "https://ranker-704af.firebaseio.com",
      projectId: "ranker-704af",
      storageBucket: "ranker-704af.appspot.com",
      messagingSenderId: "486622039229",
      appId: "1:486622039229:web:c7a398e1e64207d994fbd4",
      measurementId: "G-0Y2FJ4SPKK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //   firebase.analytics();
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          // User is signed in.
          window.open("gnduranker.html", "_self");
      } else {
          // No user is signed in.
      }
  });

  function login() {
      var userEmail = document.getElementById("email").value;
      var userPass = document.getElementById("password").value;
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(user => {
          // Sign in success
      }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          window.alert(errorMessage);
      });
  }

  function signup() {
      // var userName = document.getElementById("name").value;
      var userEmail = document.getElementById("email").value;
      var userPass = document.getElementById("password").value;
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          window.alert("error occur : " + errorMessage);
      });
  }