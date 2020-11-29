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
        // window.open("gnduranker.html", "_self");
        var y = document.getElementsByName("loginele");
        var x = document.getElementsByName("nologele");
        for (i = 0; i < y.length; i++) {
            y[i].classList.remove('d-none');
        }
        for (i = 0; i < x.length; i++) {
            x[i].classList.add('d-none');
        }
    } else {
        // No user is signed in.
        document.getElementById('login').classList.remove('d-none');
        var x = document.getElementsByName("loginele");
        var y = document.getElementsByName("nologele");
        for (i = 0; i < x.length; i++) {
            x[i].classList.add('d-none');

        }
        for (i = 0; i < y.length; i++) {
            y[i].classList.remove('d-none');
        }

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