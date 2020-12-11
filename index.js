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
            var email_id = user.email;
            var name = email_id.substring(0, email_id.lastIndexOf("@"));
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

function facebookSignup() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
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

// main data table printing and searching

var firestore = firebase.firestore();
const bca2020 = firestore.collection("GNDU").doc("BCA").collection("2020");

getRealtimeUpdates = function() {
    var pos = 0;
    bca2020.onSnapshot(function() {
        bca2020.where("Position", "<", 11)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    pos += 1;
                    var mydata = doc.data();
                    // console.log(doc.id, " => ", doc.data());
                    $('#table_body').append("<tr> <td scope = \"row\" > #" + mydata.Position + "</td><td>" + mydata.Name +
                        "</td><td>" + mydata.RollNo + "</td><td>" + mydata.Result + "</td></tr>");
                });
            })
            .catch(function(error) {
                console.log("got an Error : ", error);
            });
    })
}
getRealtimeUpdates();

function search_me() {
    const name = document.getElementById("usname");
    const roll = document.getElementById("usroll");
    const marks = document.getElementById("usmarks");
    const rank = document.getElementById("myrank");
    const searchVal = parseInt(document.getElementById("searchMe-bar").value.trim());
    document.getElementById("search-bar").classList.remove('search-box-h');
    document.getElementById("sResult").classList.add("d-none");
    if (searchVal != null && searchVal != '') {
        bca2020.where("RollNo", "==", searchVal)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    document.getElementById("sResult").classList.remove("d-none");
                    console.log(doc.id, " => ", doc.data());
                    var mydata = doc.data();
                    rank.innerHTML = "#" + mydata.Position;
                    name.innerHTML = mydata.Name;
                    roll.innerHTML = mydata.RollNo;
                    marks.innerHTML = mydata.Result;
                });
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
    } else {
        document.getElementById("search-bar").classList.add('search-box-h');
    }
}