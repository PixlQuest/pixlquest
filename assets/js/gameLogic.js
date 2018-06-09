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

  // Show a popup when the user asks to sign in with Google
  googleLogin.addEventListener('click', function(event) {
    event.preventDefault();

    console.log("You are here GoogleAuth");
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
      // start
      var ix = Webflow.require('ix2');
      var $el = $('.cont_main');
      var trigger = {"type":"load","stepsA":[{"wait":200},{"opacity":1,"transition":"transform 500ms ease 0ms, opacity 500ms ease 0ms","x":"0px","y":"0px"}],"stepsB":[]};
      ix.run(trigger, $el);
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

}); //define
