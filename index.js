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
            var name = email_id.substring(0, email_id.lastIndexOf("@"));
            // document.getElementById("user_name").innerHTML = "hi there : " + id_name;
            document.getElementById("user_name").innerHTML = name;
        }

        var y = document.getElementsByName("loginele");
        var x = document.getElementsByName("nologele");
        for (i = 0; i < y.length; i++) {
            y[i].classList.remove('d-none');
        }
        for (i = 0; i < x.length; i++) {
            x[i].classList.add('d-none');
        }
        document.getElementById('login').classList.add('d-none');
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
    var z = document.getElementsByName("loading");
    for (i = 0; i < z.length; i++) {
        z[i].classList.add('d-none');
    }
});

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function login() {
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(user => {
        // Sign in success
        document.getElementById('greeting').classList.remove('d-none');
        document.getElementById('gr_msg').innerHTML = "Welcome back";
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
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(user => {
        // Sign up success
        var user = firebase.auth().currentUser;
        user.displayName = user.email.substring(0, user.email.lastIndexOf("@"));

        document.getElementById('greeting').classList.remove('d-none');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("error occur : " + errorMessage);
    });
}

function googleSignup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function logout() {
    firebase.auth().signOut();
}