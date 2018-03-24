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
          auth = app.auth(),
          storage = app.storage();

  // Creating a reference to the waiting room chat
  var databaseRef = database.ref().child('chat');

  // Event listener for the send button
  sendButton.addEventListener('click', function(evt) {
        var chat = { name: username, message: textInput.value };
        databaseRef.push().set(chat);
        textInput.value = '';
      });

  // Listen for when child nodes get added to the collection
  databaseRef.on('child_added', function(snapshot) {
    // Get the chat message from the snapshot and add it to the UI
    var chat = snapshot.val();
    addMessage(chat);
  });
  db.collection("pqRooms").doc("room02")
    .onSnapshot(function(doc) {
        console.log("=============================================");
        console.log("Current category ", doc.data().category);
        console.log("=============================================");
      $( '#newCatetory' ).text( doc.data().category ); // doc.data().category
    });
  // Show a popup when the user asks to sign in with Google
  googleLogin.addEventListener('click', function(event) {
    event.preventDefault();

    console.log("You are here GoogleAuth");
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  });

  // Allow the user to sign out
  logout.addEventListener('click', function(e) {
  //  view.welcomeView(true);
    auth.signOut();
  });

  // When the user signs in or out, update the username we keep for them
      // auth.onAuthStateChanged(function(user) {
      //   if(user.uid) {
      //     let currentPage = 'login';
      //     $('#login').removeClass('active');
      //     $('#waitingroom').addClass('active');
      //     currentPage = 'waitingroom';
      //     history.pushState({}, currentPage, `#${currentPage}`);
      //     document.getElementById(currentPage).dispatchEvent(new Event('show'));
      //   } //end if user.uid
      //
      //
      //   //Check for googleAuthUser in pqUsers collection
      //   db.collection("pqUsers").where("id", "==", user.uid).get().then((querySnapshot) => {
      //     if (querySnapshot.empty) {
      //       addUser(user);
      //     } else {
      //       console.log(user.displayName + " is already present");
      //       // querySnapshot.forEach((doc) => {// loop through users
      //       //   if (!doc.exists) {
      //       //     console.log("doc does not exist");
      //       //
      //       //   } else {
      //       //     console.log("doc does exist", doc);
      //       //       //  var obj = {};
      //       //       //obj.name = doc.data().name;
      //       //       //return response.status(200).send(obj);
      //       //       //return response.json(obj);
      //       //     }
      //       //     console.log(`${doc.id} => ${doc.data()}`);
      //       //   }); //end querySnapshot.forEach
      //     }
      //     })
      //     .catch(err => {
      //         console.log('Error getting document', err);
      //         return response.json(err);
      //     }); //end db.collection
      //   if (user) {
      //     setUsername(user.displayName,user);
      //     // TEST
      //     //console.log("db", db);  //Check if firesotre exist
      //   }
      //   else {
      //     // User signed out, set a default username
      //     setUsername("Web");
      //   }
      // });
      //Check user auth status
      auth.onAuthStateChanged(function(firebaseAuthUser) {
        //show when the state changes
        stateChangeCount += 1;
        console.log("state changed! " + stateChangeCount);
        /*

          IN CLIENT

          if (pqUser && in WR){
            checkForAvailableRoom(firebaseAuthUser);
          }
          else {
          client is not a pqUser
          new user added to collection (push to waiting room)

        }

          IN CLOUD
          when new user gets added to collection
          assignUsertoRoom function





      */
        //if user still authenticated
          //if pquser and
                //checkWhichRoom();

        //if user is not authenticated
        //console.log("onAuthStateChagned USER:",user);

        // if your not signed in do nothing
        if(firebaseAuthUser == null) {
           return console.log("The firebase user is not logged in.");
        }

        // if( user.uid ) {
        //
        //
        // } //end if user.uid


        //Check for googleAuthUser in pqUsers collection and if in WR
        db.collection("pqUsers").where("id", "==", firebaseAuthUser.uid).where('room', '==', 'WR').get().then((querySnapshot) => {
          console.log("In pqUsers where id me and room is WR ");
          // do everything i want in wher
          // set stopListening to true
          //if(stopListening){
                //unsubscribe
          //}

        //  var myCameraStatus = setCategoryInView();
          //console.log("useCameraFunc: ",setCategoryInView().useCamera);
        //  console.log("useCamera: ",myCameraStatus.useCamera);



console.log("querySnapshot.size=", querySnapshot.size ); //RM02 0       never logged in = 1
console.log("querySnapshot.empty=", querySnapshot.empty ); //RM02 true  never logged in = false
          if (querySnapshot.empty===false || ( querySnapshot.size === 0 && querySnapshot.empty===true )) {
//console.log("In if querySnapshotd"  );
            addUser(firebaseAuthUser);
            let currentPage = 'login';

              //hide welcome page
              $(".cont_main").hide();
            //  $('#login').removeClas s('active');
              $('#cameraroom').addClass('active');

              //pqcamera.charlieCamera();
            theCamera();


            currentPage = 'cameraroom';
            history.pushState({}, currentPage, `#${currentPage}`);
            document.getElementById(currentPage).dispatchEvent(new Event('show'));
           checkForAvailableRoom(firebaseAuthUser);
          // updateNumOfPlayer s();
          } else {
          //  checkForAvailableRoom(firebaseAuthUser);
              console.log("it went to the else on 216");
            let currentPage = 'login';

              $(".cont_main").hide();
            //  $('#login').removeClass('active');
              $('#waitingroom').addClass('active');
            //currentPage = 'waitingroom';
            history.pushState({}, currentPage, `#${currentPage}`);
          //  document.getElementById(currentPage).dispatchEvent(new Event('show') );
            console.log("The user has already been added.");
          }
        }); //end of else


        db.collection("pqRooms").where('name', '==', 'RM02').where('numOfPlayers', '==', 3).get().then((querySnapshot) => {

          console.log("querySnapshotRM2players3.size=", querySnapshot.size ); //RM02 0
          console.log("querySnapshotRM2players3.empty=", querySnapshot.empty );//RM02 true
          if (querySnapshot.empty === true) {
          //  checkForAvailableRoom(firebaseAuthUser);
        //  auth.signOut();
            //checkForAvail ableRoom(firedbaseAudthUser);
          //  let currentPage = null;

               //hide welcome page
              // $(".cont_main").hide();
              //$('#camera').removeClass(' active');
              // $('#waitingroom').addClass('active');
            // currentPage = 'login';
            // history.pushState({}, currentPage, `#${currentPage}`);
          //  document.getElementById(currentPage).dispatchEvent(new Event('show'));
              console.log("No one is in room 2 with 3 players");
          } else {

            let currentPage = null;

              //hide welcome page
              $(".cont_main").hide();
             $('#waitingroom').removeClass('active');
              $('#cameraroom').addClass('active');

            currentPage = 'waitingroom';
            history.pushState({}, currentPage, `#${currentPage}`);
            document.getElementById(currentPage).dispatchEvent(new Event('show'));
          }


        }) //end then db.collection
          .catch(err => {
              console.log('Error getting document', err);
            //  return response.json(err);
          }); //end catch db.collection


        if (firebaseAuthUser) {
          console.log("I AM ", firebaseAuthUser.displayName);
          setUsername(firebaseAuthUser.displayName,firebaseAuthUser);


        }
        else {
          // User signed out, set a default username
          console.log("else Web");
          setUsername("Web");
        }

      });

  //Store and handle file for firebase storage
  function handleFileSelect(e) {
        var file = e.target.files[0];

        // Get a reference to the location where we'll store our photos
        var storageRef = storage.ref().child('chat_photos');

        // Get a reference to store file at photos/<FILENAME>.jpg
        var photoRef = storageRef.child(file.name);

        // Upload file to Firebase Storage
        var uploadTask = photoRef.put(file);
        uploadTask.on('state_changed', null, null, function() {
          // When the image has successfully uploaded, we get its download URL
          var downloadUrl = uploadTask.snapshot.downloadURL;
          // Set the download URL to the message box, so that the user can send it to the database
          textInput.value = downloadUrl;
        });
      }

  //Add file listener
  file.addEventListener('change', handleFileSelect, false);


  function addUser(firebaseAuthUser) {
    //create new record
    var objPqUser = {
            id: firebaseAuthUser.uid,
            isJudge: false,
            isWinner:false,
            name: firebaseAuthUser.displayName,
            rank: 0,
            room: "WR"
          };
          console.log("addUser firebaseAuthUser",objPqUser);
          //push to the database
          db.collection("pqUsers").doc(firebaseAuthUser.uid).set(objPqUser)
          .then(function(docRef) {
            console.log("done");
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
}
function delUser(firebaseAuthUser){
  console.log("In delUser");
  console.log("firebaseAUthUser in delUser",firebaseAuthUser.uid);
  var deleteDoc = db.collection('pqUsers').doc(firebaseAuthUser.uid).delete();

}

//function setCategoryInView() {
//
//   console.log("In setCategoryInView");

  // variables
  var useCamera = true;

  var docRef = db.collection("pqRooms").doc("room02");
  docRef.get().then(function(doc) {

    if (doc.exists) {
      // testing
      //$( '#newCatetory' ).append( doc.data().category );
//$( '#newCatetory' ).append( result );
      console.log("categoryIs: ",doc.data().category);

      // create object
      var obj = {
        theViewCategory: doc.data().category,
        useCamera: true
      };
      // testing
      console.log("categoryObj: ", obj);

      return obj;
    } else {
        //error
        console.log("Error: No such document!");
        obj = {msg: "Error: No such document!"};
        return obj;
    }
  }).catch(function(error) { console.log("Error getting document:", error); });

//}; //end function setCategoryInView



  var docRef = db.collection("pqRooms").doc("room02");
  docRef.get().then(function(doc) {
    if (doc.exists) {

//$( '#newCatetory' ).append( doc.data().category );

    } else {
        //error
      //  console.log("Error: No such document!");
        obj = {msg: "Error: No such document!"};
        return obj;
    }
  }).catch(function(error) { console.log("Error getting document:", error); });

//this.charlie = 100;
// this.charlie = function(){
//   var charlieIn = 100;
//   return charlieIn;
// }
//console.log("views.charlie from main", views.charlie);
console.log("####################################");
console.log("BRAVO from main: " + view.bravo);
console.log("####################################");

// console.log("----------------------");
// var setCategoryInView = JSON.parse(localStorage.getItem("the_obj") );
// //view.bravo = setCategoryInView;
// console.log("setCategoryInView:", setCategoryInView );
// console.log("setCategoryInView:", setCategoryInView.theViewCategory );
// console.log("setCategoryInView:", setCategoryInView.useCamera );

//cameraStatus = setCategoryInView.useCamera;
console.log("----------------------");
//XXXdetermine available room
function checkForAvailableRoom(firebaseAuthUser) {
  console.log("In checkForAvailableRoom");

  //BGN update player room count
  var pqRoomsRef = db.collection('pqRooms');
  var allRooms = pqRoomsRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      if (doc.data().name === 'RM01' && doc.data().numOfPlayers === 3){
        return false;
      } else if (doc.data().name === 'RM02' && doc.data().numOfPlayers === 3){
        return false;
      }
      console.log("Are you looping through the rooms?");
      console.log("numOfPlayers: ", doc.data().numOfPlayers);
      // if (doc.data().name === 'RM01' && doc.data().numOfPlayers < 3 ) {
      //     console.log("Moving to " + doc.data().name );
      //     moveUserToRoom(firebaseAuthUser, doc.data().name);
      //
      //   //  updateNumOfPlayers();
      //     //$.post( "https://us-central1-snapquest-aac81.cloudfunctions.net/updateNumOfPlayers", { room: doc.data().name, roomId: doc.id   } );
      //     console.log("Moved " + firebaseAuthUser.displayName + " to " + doc.data().name);
      //     return false;
      //   } else {
      //     console.log("WTF RM01 " + doc.data().name);
      //   }
      if (doc.data().name === 'RM02' && doc.data().numOfPlayers < 3 ) {
            console.log("Moving to " + doc.data().name );
            moveUserToRoom(firebaseAuthUser, doc.data().name);
            updateNumOfPlayers();
            //$.post( "https://us-central1-snapquest-aac81.cloudfunctions.net/updateNumOfPlayers", { room: doc.data().name, roomId: doc.id   } );
            console.log("Moved " + firebaseAuthUser.displayName + " to " + doc.data().name);
            return false;
        } else {
          console.log("WTF RM02 " + doc.data().name);
        }



      }); //end forEach
    }) //end then var allRooms
    .catch(err => {
      console.error('Error getting documents from checkForAvailableRoom()', err);
    }); //end catch allRooms

    //END update player room count

} //end function checkForAvailableRoom



  //2. Move user to room
  function moveUserToRoom(firebaseAuthUser,room) {
    console.log("In moveUserToRoom");
    console.log("test user.uid in moveUser",firebaseAuthUser.uid);
    // set the user
    var theUser = db.collection('pqUsers').doc(firebaseAuthUser.uid);

    // update the room field
    var updateSingle = theUser.update({ room: room }).then(function(){

      console.log("done"); }); //end updateSingle

  }; //end function moveUserToRoom

  //Update number of players
  function updateNumOfPlayers (){
    //BGN update player room count
    var pqRoomsRef = db.collection('pqRooms');
    var allRooms = pqRoomsRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
       console.log("updateNumOfPlayers forEach: ",doc.id, '=>', doc.data().name);
        $.post( "https://us-central1-snapquest-aac81.cloudfunctions.net/updateNumOfPlayers", { room: doc.data().name, roomId: doc.id   } );
 ////////////////////
 ///////////////////

        console.log("category ",doc.data().category +" "+ "numOfPlayers " + doc.data().numOfPlayers);
        var categoryHere = doc.data().category;
        var playerCount = doc.data().numOfPlayers;
        console.log("category ",categoryHere +" "+ "playerCount " + playerCount);


        //categoryHere == "null"
        if ( true ) {


          console.log("in IF");
          var hold;
          var WordObject;
          var colors = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Indigo", "Violet", "Purple", "Magenta", "Pink", "Brown", "White", "Gray", "Black"];
          var randomColor = function(){
            var rColor = Math.floor(Math.random() * 15);
            console.log(colors[rColor]);
            return colors[rColor];
          };
          var wordCategory = function(result){
            var listTotal = result.length;
            //console.log(result.length);

            var rWord = Math.floor(Math.random() * listTotal);
            return result[rWord].word;
          }
          var myURL = "https://api.datamuse.com/words?rel_jja=" + randomColor();
         // var result = $.get( "https://api.datamuse.com/words?rel_jja=" + randomColor(), { room: doc.data().name, roomId: doc.id   } );
          $.get( myURL, function( data ) {
            //$( ".result" ).html( data );
           let result = "The Category word is:" + wordCategory(data);
             console.log("The category has been assigned " + "and is " + result);
            // BGN update players count
            var pqWaitingRoom = db.collection('pqRooms').doc(doc.id);
            var updateNumOfPlayers2 = pqWaitingRoom.update({ category: result })
                .then(function(data2){

                  return console.log("done",data2);
                  // set object response
                  // let obj = {status: "ok"};
                  // // return the status
                  //  response.send(obj);
                })
                .catch(function(err){
                return  console.error(err);
                //  return response.json(err);
                });
                // END update players count
                //$( '#newCatetory' ).append( doc.data().category );
          })
          .fail(function() { console.log("Error " + data); });

        }
      }); //end forEach
    }) //end then
    .catch(err => {
      console.log('Error getting documents', err);
    }); //end catch
    //END update player room count

  };




  // Set the username when logged in
  function setUsername(newUsername) {
        if (newUsername == null) {
            newUsername = "Web";
        }
        console.log(newUsername);


        username = newUsername;
        var isLoggedIn = username != 'Web';
        //THIS IS THE WAITING ROOM VIEW
        usernameElm.innerText = newUsername;
        logout.style.display = isLoggedIn ? '' : 'none';
        //facebookLogin.style.display = isLoggedIn ? 'none' : '';
        googleLogin.style.display = isLoggedIn ? 'none' : '';

  } //end setUsername

  // Add a message to the waiting room chat
  function addMessage(chat) {
        var li = document.createElement('li');
        var nameElm = document.createElement('h4');
        nameElm.innerText = chat.name;
        li.appendChild(nameElm);
        li.className = 'highlight';
        if ( chat.message.indexOf("https://firebasestorage.googleapis.com/") == 0
          || chat.message.indexOf("https://lh3.googleusercontent.com/") == 0
          || chat.message.indexOf("http://pbs.twimg.com/") == 0
          || chat.message.indexOf("data:image/") == 0) {
          var imgElm = document.createElement("img");
          imgElm.src = chat.message;
          li.appendChild(imgElm);
        }
        else {
          var messageElm = document.createElement("span");
          messageElm.innerText = chat.message;
          li.appendChild(messageElm);
        }
        messagesList.appendChild(li);
        li.scrollIntoView(false);
        sendButton.scrollIntoView(false);

  } //end addMessage function

  // Set a default username
  setUsername('Web');



$( document ).ready(function() {

  // add pqSpa

  /*
  const pqSpa = {
    pages: [],
    show: new Event('show'),
    init: function(){

        pqSpa.pages = document.querySelectorAll('.page');
        pqSpa.pages.forEach(function(pg){
            pg.addEventListener('show', pqSpa.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach(function(link){
            link.addEventListener('click', pqSpa.nav);
        })
        history.replaceState({}, 'Login', '#login');
        window.addEventListener('popstate', pqSpa.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, "#${currentPage}");
        document.getElementById(currentPage).dispatchEvent(pqSpa.show);
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');
        h1.classList.add('big')
        setTimeout(function(h){
            h.classList.remove('big');
        }, 1200, h1);
    },

    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(pqSpa.show);
    }
  }
  // end pqSpa

  //call pqSpa ini function
  pqSpa.init();

  // $( "#snap" ).click(function() {
  //   snap();
  // });

  //Test document ready
  console.log( "ready!" );
*/
}); //end document.ready
//return this;








//
//
//
//
//
//
//
//
//
//
//

  //When first accessing the page go to welcome section
  //view.welcomeView();



//  console.log(view);


/*




//If user clicks on more info button
$( "#moreInfo" ).click(function() {
	//Set the view to the intro info section
  	introView();
});

$("#goBacktoWelcomePage").click(function(){
	//go back to the welcome page
	welcomeView();
});

//2. USER AUTHENTICATES
		//On line 156 js put in the waiting room view to get the user into the waiting room



//LISTENER NEEDED
//###A Need to know the player id
//###B Need to know the player room number assigned
//###C Need to know number of players in assigned room


//3. USER IS IN THE WAITING ROOM

// if the currently assigned waiting room has 3 players
if(roomAssigned.length == 3){

	//###D Need a new category word from database api function here
	newGame();
	playerJudgeViewDecider();
}


//4. USER IS NOW A PLAYER OR A JUDGE IN AN ACTIVE GAME

//a. The Players

//If user clicks on more info button
$( "#takePhotoBtn" ).click(function() {
	//save the photo and go to the results view
  	savePhoto();
  	resultView();
});


//b. The Judge

//###D Listener is needed to pull any pictures submitted

 /*
 DBListenerFunction: if new picture added{
	addPictureToJudge();
 }
 */

/*
//If judge X's a picture
$( "#btnSetBad" ).click(function() {
	//###E Delete current picture from firecloud
	//delete photo from webpage go to next photo

	if(noPhotoLeft)
	{
		//###E noPlayerWins room variable set to true send this info to the database
	}
});

//###F Listener needed here to show room variable noPlayerWins from the database
//call function: noWinner();





//If judge checkmarks a picture
$( "#btnSetWinner" ).click(function() {
	//save the photo and go to the results view
	//###G Send winner result to firebase (picture should have a user id attached to it)
	//###H Set gameOver firebase room variable to true
});

//###I Listener needed here to show room database gameover variable from the database
//call function: gameOver();


//5. MOVE USER TO RESULTS PAGE

if(gameOver || noWinner){

	roundEnd();
}

/*
//Views

//Welcome view with login screen
var welcomeView = function(){
   $(".sect_top_brand").hide();
}

//Intro view with instructions
var introView = function(){

}

//hide and show code for waitingRoom
var waitingRoomView = function(){

}
*/
/*
//### Need to know if the specific player/computer record judge value set to true or false
var playerJudgeViewDecider = function(judgeValueForPlayer){

	if(judgeValueForPlayer == true){
		judgeView();
	}
	else{
		playerView();
	}
}

/*
//hide and show code for waitingRoom
var waitingRoomView = function(){

}

//player view with camera and category word
var playerView = function(){
	cameraSet();
	//buttons show hide
}

//judge view with picture slider of the players images
var judgeView = function(){

}

//shows all the final result of the round for 7 seconds before going back to the waiting area
var resultView = function(){

}


var newGame = function(){

}

/////////////////////////////
//Judge Functions
var noWinnerView = function(){

}
*/

/*
var gameOver = function(gameOverVariable){

	if (gameOverVariable){
		resultView();
	}
}
/////////////////////////////



/////////////////////////////
//Camera Functions

//Give user camera capability
var cameraSet = function(){
	//camera code
}

//save photo and send it to the database
var savePhoto = function(){

}
/////////////////////////////



//Moves user from results page to new game or waiting room
var afterResults = function(){
	clearInterval(timeThis);

	//If there are 3 players
	if(###playerCount == 3){
		newGame();
		playerJudgeViewDecider();
	}
	else{
			waitingRoomView(); //go to the waiting room view
		}
}

var roundEnd() = function(){

		//show results view for 7 seconds
		var timeThis = setInterval( resultView(), 1000);

		//send user to new game or waiting room via afterResults Function
		setTimeout(afterResults, 7000);
	}
*/
//});



  var theCamera = function(){
  var errorElement = document.querySelector('#errorMsg');
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas'); // holder for photo
  var context = canvas.getContext('2d');
  var cont = canvas.getContext('2d');

  // variables for later use.
  var w, h, ratio;

  // Put variables in global scope to make them available to the browser console.
  var constraints = window.constraints = {
    audio: false,
    video: { facingMode: "environment" }
  };

  $(".picture").hide();

  //wait for the video to come in and then set the dimensions for recording to the canvas
  video.addEventListener('loadedmetadata', function() {
        // Calculate the ratio of the video's width to height
        ratio = video.videoWidth / video.videoHeight;
        // Define the required width as 100 pixels smaller than the actual video's width
        w = video.videoWidth - 100;
        // Calculate the height based on the video's width and the ratio
        h = parseInt(w / ratio, 10);
        // Set the canvas width and height to the values just calculated
        canvas.width = w;
        canvas.height = h;
      }, false);


  function handleSuccess(stream) {
    var videoTracks = stream.getVideoTracks();

    stream.oninactive = function() {
      console.log('Stream inactive');
    };
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
    }

  //if it dont work print this.
  function handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
          constraints.video.width.exact + ' px is not supported by your device.');
    } else if (error.name === 'PermissionDeniedError') {
      errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    errorMsg('getUserMedia error: ' + error.name, error);
  }


  //if it dont work let us know in the html
  function errorMsg(msg, error) {
    // errorElement.innerHTML += '<p>' + msg + '</p>';
    console.log(msg);
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }





  //when a picture is taken do the following
  var snap = function() {
    console.log("click,click!");
    $(".videoCam").hide()
    $(".picture").show();


        // Define the size of the rectangle that will be filled (basically the entire element)

        context.fillRect(0, 0, w, h);
        // Grab the image from the video
        context.drawImage(video, 0, 0, w, h);

/*
        var myImage = new Image();
        myImage.src = imgData;
        cont.drawImage(savedPic, 0, 0, w, h);
      */
      var myCanvas = document.getElementById('new_canvas');
      var ctv = myCanvas.getContext('2d');
      var img = new Image;
      img.onload = function(){
        ctv.drawImage(img,0,0,w,h); // Or at whatever offset you like


        // BGN NEW
        myCanvas.toBlob(function(blob){
          console.log("savedPic", blob);
          var image = new Image();
          image.src = blob;
          // Get a reference to the location where we'll store our photos
          var storageRef = storage.ref().child('chat_photos');
          // Get a reference to store file at photos/<FILENAME>.jpg
          var photoRef = storageRef.child(blob.name);
          // Upload file to Firebase Storage
          var uploadTask = photoRef.put(blob);

          uploadTask.on('state_changed', null, null, function() {
            // When the image has successfully uploaded, we get its download URL
            var downloadUrl = uploadTask.snapshot.downloadURL;
            console.log(downloadUrl);
            // Set the download URL to the message box, so that the user can send it to the database
            textInput.value = downloadUrl;
            }); //upload task
             //upload pic
          //var uploadTask = storage.ref().child('chat_photos').put(blob);
        });
        // END NEW


      }; //onload




      //Stop the camera after photo is taken
      var tracks = stream.getTracks();

      tracks.forEach(function(track) {
        track.stop();
      });  //tracks 
    //uploa  var uploadTask = storageRef.child('images/' + "apple").put(blob);
}

      // function uploadPic(savedPic) {
      //       var file = savedPic;
      //
      //       // Get a reference to the location where we'll store our photos
      //       var storageRef = storage.ref().child('chat_photos');
      //
      //       // Get a reference to store file at photos/<FILENAME>.jpg
      //       var photoRef = storageRef.child(file.name);
      //
      //       // Upload file to Firebase Storage
      //       var uploadTask = photoRef.put(file);
      //       uploadTask.on('state_changed', null, null, function() {
      //         // When the image has successfully uploaded, we get its download URL
      //         var downloadUrl = uploadTask.snapshot.downloadURL;
      //         // Set the download URL to the message box, so that the user can send it to the database
      //         textInput.value = downloadUrl;
      //       }); //upload task
      //     } //upload pic


  navigator.mediaDevices.getUserMedia(constraints)
  .then(handleSuccess).catch(handleError);

  $( "#snap" ).click(function() {
    snap();
  }); //snap




// return this;
} //camera function
}); //define
