 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 //  var firebaseConfig = {
 //      apiKey: "AIzaSyDswRp2CSZXfjjro-by_4ohqfYDw5mn54M",
 //      authDomain: "ranker-704af.firebaseapp.com",
 //      databaseURL: "https://ranker-704af.firebaseio.com",
 //      projectId: "ranker-704af",
 //      storageBucket: "ranker-704af.appspot.com",
 //      messagingSenderId: "486622039229",
 //      appId: "1:486622039229:web:c7a398e1e64207d994fbd4",
 //      measurementId: "G-0Y2FJ4SPKK"
 //  };
 // Initialize Firebase
 //  firebase.initializeApp(firebaseConfig);
 //   firebase.analytics();
 var firestore = firebase.firestore();
 var id = null;
 const docRef = firestore.doc("sample/tempResults");
 const myCounter = firestore.doc("counter/count");
 const score = firestore.collection("scores");

 function save() {
     const name = document.getElementById("std_name").value;
     const roll = document.getElementById("roll_num").value;
     const marks = document.getElementById("t_marks").value;
     docRef.set({
         name: name,
         rollNo: roll,
         marks: marks
     }).then(function() {
         console.log("saved");
     }).catch(function(error) {
         console.log("got an error: ", error);
     });
 }

 //  in-case realtimeupdate not works

 //  function load() {
 //      const name = document.getElementById("fstName");
 //      const roll = document.getElementById("fstRoll");
 //      const marks = document.getElementById("fstMarks");

 //      docRef.get().then(function(doc) {
 //          if (doc.exists) {
 //              const mydata = doc.data();
 //              console.log("Document data:", doc.data());
 //              name.innerHTML = mydata.name;
 //              roll.innerHTML = mydata.rollNo;
 //              marks.innerHTML = mydata.marks;
 //          } else {
 //              // doc.data() will be undefined in this case
 //              console.log("No such document!");
 //          }
 //      }).catch(function(error) {
 //          console.log("Error getting document:", error);
 //      });
 //  }
 function fload() {
     firestore.collection("scores").where("marks", "==", "706")
         .get()
         .then(function(querySnapshot) {
             querySnapshot.forEach(function(doc) {
                 // doc.data() is never undefined for query doc snapshots
                 var mydata = doc.data();
                 console.log(doc.id, " => ", doc.data());
                 $('#table_body').append("<tr> <td scope = \"row\" > #" + "pos" + "</td><td>" + mydata.name +
                     "</td><td>" + mydata.rollNo + "</td><td>" + mydata.marks + "</td></tr>");
             });
         })
         .catch(function(error) {
             console.log("Error getting documents: ", error);
         });

 }

 getRealtimeUpdates = function() {
     var pos = 0;
     score.onSnapshot(function() {
         score.where("marks", "==", "706").orderBy("name")
             .get()
             .then(function(querySnapshot) {
                 querySnapshot.forEach(function(doc) {
                     pos += 1;
                     var mydata = doc.data();
                     console.log(doc.id, " => ", doc.data());
                     $('#table_body').append("<tr> <td scope = \"row\" > #" + pos + "</td><td>" + mydata.name +
                         "</td><td>" + mydata.rollNo + "</td><td>" + mydata.marks + "</td></tr>");
                 });
             })
             .catch(function(error) {
                 console.log("got an Error : ", error);
             });
     })

     myCounter.onSnapshot(function(doc) {

         if (doc.exists) {

             const mydata = doc.data();
             id = mydata.current;
             console.log("counter: ", doc.data());
         }
     })
 }

 if (window.location.pathname == '/') {
     getRealtimeUpdates();
 }

 function upload() {
     id += 1;
     var docRef1 = firestore.collection("scores").doc(String(id)); // main results folder or collection

     const name = document.getElementById("std_name").value;
     const roll = document.getElementById("roll_num").value;
     const marks = document.getElementById("t_marks").value;
     docRef1.set({
         name: name,
         rollNo: roll,
         marks: marks
     }).then(function() {
         myCounter.set({
             current: id
         })
         console.log("saved");
     }).catch(function(error) {
         console.log("got an error: ", error);
     });

 }

 function testadd() {
     var citiesRef = firestore.collection("cities");

     citiesRef.doc("SF").set({
         name: "San Francisco",
         state: "CA",
         country: "USA",
         capital: false,
         population: 860000,
         regions: ["west_coast", "norcal"]
     });
     citiesRef.doc("LA").set({
         name: "Los Angeles",
         state: "CA",
         country: "USA",
         capital: false,
         population: 3900000,
         regions: ["west_coast", "socal"]
     });
     citiesRef.doc("DC").set({
         name: "Washington, D.C.",
         state: null,
         country: "USA",
         capital: true,
         population: 680000,
         regions: ["east_coast"]
     });
     citiesRef.doc("TOK").set({
         name: "Tokyo",
         state: null,
         country: "Japan",
         capital: true,
         population: 9000000,
         regions: ["kanto", "honshu"]
     });
     citiesRef.doc("BJ").set({
         name: "Beijing",
         state: null,
         country: "China",
         capital: true,
         population: 21500000,
         regions: ["jingjinji", "hebei"]
     });
 }