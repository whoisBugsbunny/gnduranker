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


 getRealtimeUpdates = function() {
     myCounter.onSnapshot(function(doc) {

         if (doc.exists) {

             const mydata = doc.data();
             id = mydata.current;
             console.log("counter: ", doc.data());
         }
     })
 }

 getRealtimeUpdates();

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

 function bulktest() {
     var menu = [{
             //  "id": 1,
             "name": "Focaccia al rosmarino",
             "description": "Wood fired rosemary and garlic focaccia",
             "price": 8.50,
             "type": "Appetizers"
         },
         {
             //  "id": 2,
             "name": "Burratta con speck",
             "description": "Burratta cheese, imported smoked prok belly prosciutto, pached balsamic pear",
             "price": 13.50,
             "type": "Appetizers"
         },
         {
             //  "id": 3,
             "name": "Focaccia al rosmarino",
             "description": "Wood fired rosemary and garlic focaccia",
             "price": 8.50,
             "type": "Appetizers"
         },
         {
             //  "id": 4,
             "name": "Burratta con speck",
             "description": "Burratta cheese, imported smoked prok belly prosciutto, pached balsamic pear",
             "price": 13.50,
             "type": "Appetizers"
         }
     ]
     var c = 10;
     const collection1 = firestore.collection("menu").doc("test").collection("testing");
     menu.forEach(function(obj) {
         c += 1;
         collection1.doc(String(c)).set({
                 //  id: obj.id,
                 name: obj.name,
                 description: obj.description,
                 price: obj.price,
                 type: obj.type
             }).then(function(docRef) {
                 console.log("Document written with ID: ", docRef.id);
             })
             .catch(function(error) {
                 console.error("Error adding document: ", error);
             });
     });
 }

 function bulkdata() {
     const bca2020 = firestore.collection("GNDU").doc("BCA").collection("2020");
     var result2020 = [{
             "Roll_No": 10721604472,
             "Candidate_Name": "ABHISHEK GILL",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723801,
             "Candidate_Name": "VANSHIKA GARG",
             "Result": 1869,
             "Position": 1
         },
         {
             "Roll_No": 10721723802,
             "Candidate_Name": "AVINASH SINGH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723804,
             "Candidate_Name": "ROHIT KUMAR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723805,
             "Candidate_Name": "SLONI PARDEEP",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723811,
             "Candidate_Name": "SUNEEL KUMAR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723815,
             "Candidate_Name": "RAHUL ARYA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723816,
             "Candidate_Name": "HIMANSHU ARORA",
             "Result": 1576,
             "Position": 9
         },
         {
             "Roll_No": 10721723818,
             "Candidate_Name": "SHIVAM KUMAR PANDAY",
             "Result": 1727,
             "Position": 3
         },
         {
             "Roll_No": 10721723819,
             "Candidate_Name": "SANJAY KHURANA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723822,
             "Candidate_Name": "SOURAV SAINI",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723824,
             "Candidate_Name": "NAVDEEP SINGH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723825,
             "Candidate_Name": "RITVIK",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723826,
             "Candidate_Name": "MANSI",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723828,
             "Candidate_Name": "HARSHDEEP SINGH",
             "Result": 1399,
             "Position": 22
         },
         {
             "Roll_No": 10721723831,
             "Candidate_Name": "AYUSH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723832,
             "Candidate_Name": "KHUSHBU GOSWAMI",
             "Result": 1336,
             "Position": 26
         },
         {
             "Roll_No": 10721723835,
             "Candidate_Name": "MANISHA JAKHU",
             "Result": 1603,
             "Position": 7
         },
         {
             "Roll_No": 10721723836,
             "Candidate_Name": "JASPREET SINGH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723837,
             "Candidate_Name": "DEEPAK NISHAD",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723839,
             "Candidate_Name": "ANUBHAV BASSI",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723842,
             "Candidate_Name": "AKSHAY CHOUHAN",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723843,
             "Candidate_Name": "SANTOSH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723844,
             "Candidate_Name": "NAVISH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723845,
             "Candidate_Name": "KHUSHBOO",
             "Result": 1520,
             "Position": 14
         },
         {
             "Roll_No": 10721723846,
             "Candidate_Name": "INDERJIT SINGH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723847,
             "Candidate_Name": "PRIYA VERMA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723848,
             "Candidate_Name": "NAMAN",
             "Result": 1643,
             "Position": 4
         },
         {
             "Roll_No": 10721723849,
             "Candidate_Name": "SIMRAN CHAWLA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723850,
             "Candidate_Name": "MOHIT JASSI",
             "Result": 1316,
             "Position": 27
         },
         {
             "Roll_No": 10721723852,
             "Candidate_Name": "SHARANJEET",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723853,
             "Candidate_Name": "KANHAIYA PANDIT",
             "Result": 1482,
             "Position": 17
         },
         {
             "Roll_No": 10721723854,
             "Candidate_Name": "MUSKAAN MADAAN",
             "Result": 1442,
             "Position": 18
         },
         {
             "Roll_No": 10721723855,
             "Candidate_Name": "KANWALJIT SINGH",
             "Result": 1442,
             "Position": 19
         },
         {
             "Roll_No": 10721723857,
             "Candidate_Name": "JASLEEN SINGH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723859,
             "Candidate_Name": "KAMAL RANI GILL",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723861,
             "Candidate_Name": "PRAKASH SINGH SAINI",
             "Result": 1306,
             "Position": 28
         },
         {
             "Roll_No": 10721723864,
             "Candidate_Name": "ANKIT",
             "Result": 1489,
             "Position": 16
         },
         {
             "Roll_No": 10721723868,
             "Candidate_Name": "ANJALI",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723869,
             "Candidate_Name": "SAGAR BHAGAT",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723871,
             "Candidate_Name": "ISHA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723872,
             "Candidate_Name": "ANJALI THAKUR",
             "Result": 1345,
             "Position": 24
         },
         {
             "Roll_No": 10721723875,
             "Candidate_Name": "RITIN SHARDA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723881,
             "Candidate_Name": "SAHIL VIG",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723882,
             "Candidate_Name": "LOVELY",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723883,
             "Candidate_Name": "RAJANVEER",
             "Result": 1339,
             "Position": 25
         },
         {
             "Roll_No": 10721723884,
             "Candidate_Name": "SHUBHAM KUMAR",
             "Result": 1584,
             "Position": 8
         },
         {
             "Roll_No": 10721723886,
             "Candidate_Name": "VANDNA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723887,
             "Candidate_Name": "PARMOD SINGH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723888,
             "Candidate_Name": "ANMOLJIT SINGH",
             "Result": 1380,
             "Position": 23
         },
         {
             "Roll_No": 10721723889,
             "Candidate_Name": "SHAGUN SHARMA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723891,
             "Candidate_Name": "VANDANA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723894,
             "Candidate_Name": "SAHIL",
             "Result": "RL(EVS)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723899,
             "Candidate_Name": "RAJNI SIKRI",
             "Result": 1551,
             "Position": 11
         },
         {
             "Roll_No": 10721723900,
             "Candidate_Name": "KULDEEP KUMAR",
             "Result": 1423,
             "Position": 21
         },
         {
             "Roll_No": 10721723903,
             "Candidate_Name": "MAHESH PANDEY",
             "Result": 1626,
             "Position": 5
         },
         {
             "Roll_No": 10721723904,
             "Candidate_Name": "HEMA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723905,
             "Candidate_Name": "CHAND VERMA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723908,
             "Candidate_Name": "JASKARAN SINGH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723909,
             "Candidate_Name": "VARUN CHOHAN",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723910,
             "Candidate_Name": "GURMEJ SINGH",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723913,
             "Candidate_Name": "DIKSHA",
             "Result": 1509,
             "Position": 15
         },
         {
             "Roll_No": 10721723914,
             "Candidate_Name": "SUDHANSHU ARORA",
             "Result": 1429,
             "Position": 20
         },
         {
             "Roll_No": 10721723915,
             "Candidate_Name": "AMAN",
             "Result": 1626,
             "Position": 6
         },
         {
             "Roll_No": 10721723918,
             "Candidate_Name": "DEEPAK",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723922,
             "Candidate_Name": "SOURAV KUMAR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723923,
             "Candidate_Name": "AARTI",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723925,
             "Candidate_Name": "SAHIL SHARMA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723926,
             "Candidate_Name": "AKSHIT GUPTA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723927,
             "Candidate_Name": "SAHIL KUMAR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723929,
             "Candidate_Name": "DEEPIKA THAKUR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723930,
             "Candidate_Name": "KUNAL KUMAR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723932,
             "Candidate_Name": "DINESH KUMAR JENA",
             "Result": 1537,
             "Position": 12
         },
         {
             "Roll_No": 10721723933,
             "Candidate_Name": "AMIT RANA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723934,
             "Candidate_Name": "AKSHAY SHARMA",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723935,
             "Candidate_Name": "ANKITA RANA",
             "Result": 1527,
             "Position": 13
         },
         {
             "Roll_No": 10721723936,
             "Candidate_Name": "ABHISHEK KUMAR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723940,
             "Candidate_Name": "VIKAS THAKUR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723941,
             "Candidate_Name": "SUMIT KUMAR",
             "Result": "RL(Lower)",
             "Position": "NA"
         },
         {
             "Roll_No": 10721723943,
             "Candidate_Name": "SUCHITA THAKUR",
             "Result": 1741,
             "Position": 2
         },
         {
             "Roll_No": 10721737045,
             "Candidate_Name": "MUKUL SOODEN",
             "Result": 1563,
             "Position": 10
         }
     ]
     var c = 0;
     result2020.forEach(function(obj) {
         c += 1;
         bca2020.doc(String(c)).set({
                 "RollNo": obj.Roll_No,
                 "Name": obj.Candidate_Name,
                 "Result": obj.Result,
                 "Position": obj.Position
             }).then(function(docRef) {
                 console.log("Document written with ID: ", docRef.id);
             })
             .catch(function(error) {
                 console.error("Error adding document: ", error);
             });
     })

 }