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
          var user = firebase.auth().currentUser;

          if (user != null) {

              // var id_name = user.displayName;
              var email_id = user.email;
              var email_verified = user.emailVerified;
              var email_verified_val = "";

              if (email_verified) {
                  email_verified_val = "account is varified";
                  document.getElementById("verification").style.display = "none";
              } else {
                  email_verified_val = "account is not varified";
              }
              // document.getElementById("user_name").innerHTML = "hi there : " + id_name;
              document.getElementById("user_email").innerHTML = email_id;

          }
      } else {
          // No user is signed in.
          window.open("index.html", "_self");
      }
  });

  function verification() {
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function() {
          // Email sent.
          window.alert("verification email is sent");
      }).catch(function(error) {
          // An error happened.
          window.alert("error : " + error.message);
      });
  }

  function logout() {
      firebase.auth().signOut();
  }