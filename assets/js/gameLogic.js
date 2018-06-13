//1. USER LOGS INTO WEBSITE BY DEFAULT THE WELCOME VIEW IS SETUP ON THE PAGE BY DEFAULT
console.log("gameLogic is online");


define(["jquery", "views", "main"],function($, view, main, pqcamera) {
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
console.log("pqcamera:",pqcamera);
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  var messagesList = document.getElementById('messages'),
          textInput = document.getElementById('text'),
          sendButton = document.getElementById('send'),
          login = document.getElementById('login'),
          googleLogin = document.getElementById('google'),
          facebookLogin = document.getElementById('facebook'),
          signedIn = document.getElementById('loggedin'),
          logout = document.getElementById('logout'),
          usernameElm = document.getElementById('username'),
          password = document.getElementById('password'),
          onBoardingWebflow = document.getElementById('sect_onboarding'),
          letsStart = document.getElementById('letsStart'),
          username = "Web";

var stateChangeCount = 0;
var cameraStatus = false;
var wendy = 200;
  //Weird require needed here
  require("firestore");

  //Firebase config for init
  var config = {
        apiKey: "AIzaSyA1SgiyAGh_uUPmTcrs_yK1TUT6GVFyxww",
        authDomain: "snapquest-aac81.firebaseapp.com",
        databaseURL: "https://snapquest-aac81.firebaseio.com",
        projectId: "snapquest-aac81",
        storageBucket: "snapquest-aac81.appspot.com",
        messagingSenderId: "700236181225"
      };



  // Get the Firebase app and all primitives we'll use
      var app = firebase.initializeApp(config),
        database = app.database(),
          db = app.firestore(),
          auth = app.auth();
      //    storage = app.storage();

  // Creating a reference to the waiting room chat
  var databaseRef = database.ref().child('chat');

  //Lets Start button after game instructions
  letsStart.addEventListener('click', function(event){
  event.preventDefault();
  $("#sect_onboarding").toggleClass( "sect_onboarding_pixl" );
  console.log("console.log.result=",result);

  });

  // Show a popup when the user asks to sign in with Google
  googleLogin.addEventListener('click', function(event) {
    event.preventDefault();


    console.log("You are here GoogleAuth");
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
      // start
    //  console.log("console.log.this",this);
//      $("#sect_onboarding").toggleClass( "sect_onboarding_init" );
      $("#sect_onboarding").toggleClass( "sect_onboarding_change" );
//      $("#sect_main").toggleClass( "sect_main_init" );
    //  $("#sect_main").toggleClass( "sect_main_change" );


      console.log("console.log.result=",result);

    }).catch(function(error) {
      // Handle Errors here.
      var myError = error;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // // ...
      console.log("console.log.errorCode=",myError);
    }); //end auth.signInWithPopup

  }); //end googleLogin
  auth.onAuthStateChanged(function(firebaseAuthUser) {
    stateChangeCount += 1;
    console.log("state changed! " + stateChangeCount);
    if (firebaseAuthUser == null) {
      // User is not signed in.
      return console.log("The firebase user is not logged in.");
    } else {
      //Check for googleAuthUser in pqUsers collection and if in WR
      db.collection("pqUsers").where("id", "==", firebaseAuthUser.uid).where('room', '==', 'WR').get().then((querySnapshot) => {
        // Logging
        console.log("In pqUsers where id me and room is WR ");
        console.log("querySnapshot.size=", querySnapshot.size ); //RM02 0       never logged in = 1
        console.log("querySnapshot.empty=", querySnapshot.empty ); //RM02 true  never logged in = false
        //
        if (querySnapshot.empty===false || ( querySnapshot.size === 0 && querySnapshot.empty===true )) {
          addUser(firebaseAuthUser);
          // let currentPage = 'login';
          // //hide welcome page
          // $(".cont_main").hide();
          // $('#cameraroom').addClass('active');
          // theCamera();
          // currentPage = 'cameraroom';
          // history.pushState({}, currentPage, `#${currentPage}`);
          // document.getElementById(currentPage).dispatchEvent(new Event('show'));
          // checkForAvailableRoom(firebaseAuthUser);
        } else {
          // console.log("it went to the else on 216");
          // let currentPage = 'login';
          // $(".cont_main").hide();
          // $('#waitingroom').addClass('active');
          // history.pushState({}, currentPage, `#${currentPage}`);
          console.log("The user has already been added.");
        } //end of else
      }); //end db.collection("pqUsers")
    } //end of else
  }); //end auth.onAuthStateChanged
// FUNCTIONS
function addUser(firebaseAuthUser) {
  // Create new record
  var objPqUser = {
    id: firebaseAuthUser.uid,
    isJudge: false,
    isWinner:false,
    name: firebaseAuthUser.displayName,
    rank: 0,
    room: "WR",
    virgin: true
  };

  // Test object key values
  console.log("addUser firebaseAuthUser",objPqUser);

  // Push to the database
  db.collection("pqUsers").doc(firebaseAuthUser.uid).set(objPqUser)
  .then(function(docRef) {
    // Display that it completed
    console.log("done");
  })
  .catch(function(error) {
    // Display error message
    console.error("Error adding document: ", error);
  });
}; //end addUser function
}); //define
