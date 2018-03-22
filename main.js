require.config({
    paths: {
        'jquery': "assets/js/jquery-3.3.1.min",
        'pqcamera': "assets/js/pqcamera",
        'firebase': ['https://www.gstatic.com/firebasejs/4.12.0/firebase-app', 'libs/firebase'],
        'fireauth': ['https://www.gstatic.com/firebasejs/4.12.0/firebase-auth', 'libs/fireauth'],
        'firedatabase': ['https://www.gstatic.com/firebasejs/4.12.0/firebase-database', 'libs/firedatabase'],
        'firestorage': ['https://www.gstatic.com/firebasejs/4.12.0/firebase-storage', 'libs/firestorage'],
        'firestore': ['https://www.gstatic.com/firebasejs/4.12.0/firebase-firestore', 'libs/firestore'],
        'firebaseui': ['https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui', 'libs/firebaseui'],
        'webrtc': ['https://webrtc.github.io/adapter/adapter-latest','libs/webrtc'],
        // 'camera': ['assets/js/camera']
    },
    shim: {
        'firebase': {
            exports: 'firebase'
        },
        'firebaseui': {
            exports: 'firebaseui'
        },
        'fireauth': {
            exports: 'fireauth'
        },
        'firedatabase': {
            exports: 'firedatabase'
        },
        'firestorage': {
            exports: 'firestorage'
        },
        'firestore': {
            exports: 'firestore'
        }
    }
});
require(["firebase","fireauth","firedatabase","firestorage","firestore","firebaseui", "webrtc", "pqcamera", "jquery"], function (
  firebase, fireauth, firedatabase, firestorage, firestore, firebaseui, webrtc, pqcamera, $) {
console.log("webrtc: ", webrtc);
console.log("pqcamera: ", pqcamera);
  // On page elements naming
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

  //Firebase config for init
  var config = {
        apiKey: "AIzaSyA1SgiyAGh_uUPmTcrs_yK1TUT6GVFyxww",
        authDomain: "snapquest-aac81.firebaseapp.com",
        databaseURL: "https://snapquest-aac81.firebaseio.com",
        projectId: "snapquest-aac81",
        storageBucket: "snapquest-aac81.appspot.com",
        messagingSenderId: "700236181225"
      };

  //Weird require needed here
  require("firestore");

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

  // Show a popup when the user asks to sign in with Google
  googleLogin.addEventListener('click', function(e) {
    console.log("You are here GoogleAuth");
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  });

  // Allow the user to sign out
  logout.addEventListener('click', function(e) {
    auth.signOut();
  });

  // When the user signs in or out, update the username we keep for them
      auth.onAuthStateChanged(function(user) {
        if(user.uid) {
          let currentPage = 'login';
          $('#login').removeClass('active');
          $('#waitingroom').addClass('active');
          currentPage = 'waitingroom';
          history.pushState({}, currentPage, `#${currentPage}`);
          document.getElementById(currentPage).dispatchEvent(new Event('show'));
        } //end if user.uid


        //Check for googleAuthUser in pqUsers collection
        db.collection("pqUsers").where("id", "==", user.uid).get().then((querySnapshot) => {
          if (querySnapshot.empty) {
            addUser(user);
          } else {
            console.log(user.displayName + " is already present");
            // querySnapshot.forEach((doc) => {// loop through users
            //   if (!doc.exists) {
            //     console.log("doc does not exist");
            //
            //   } else {
            //     console.log("doc does exist", doc);
            //       //  var obj = {};
            //       //obj.name = doc.data().name;
            //       //return response.status(200).send(obj);
            //       //return response.json(obj);
            //     }
            //     console.log(`${doc.id} => ${doc.data()}`);
            //   }); //end querySnapshot.forEach
          }
          })
          .catch(err => {
              console.log('Error getting document', err);
              return response.json(err);
          }); //end db.collection
        if (user) {
          setUsername(user.displayName,user);
          // TEST
          //console.log("db", db);  //Check if firesotre exist
        }
        else {
          // User signed out, set a default username
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

  //Add user to the pqUsers collection in firebase firestore
  function addUser(user) {
      var objPqUser = {
            id: user.uid,
            isJudge: false,
            isWinner:false,
            name: user.displayName,
            rank: 0,
            room: "WR"
          };
          console.log("addUser user",objPqUser);
          db.collection("pqUsers").add(objPqUser)
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
  } //end function addUser



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
  const pqSpa = {
    pages: [],
    show: new Event('show'),
    init: function(){

        pqSpa.pages = document.querySelectorAll('.page');
        pqSpa.pages.forEach((pg)=>{
            pg.addEventListener('show', pqSpa.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach((link)=>{
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
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(pqSpa.show);
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');
        h1.classList.add('big')
        setTimeout((h)=>{
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

}); //end document.ready

}); //end require
