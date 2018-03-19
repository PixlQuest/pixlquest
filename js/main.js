require.config({
    paths: {
        'jquery': "vendor/jquery-3.3.1.min",
        'firebase': ['https://www.gstatic.com/firebasejs/3.0.0/firebase', 'libs/firebase'],
        'firebaseui': ['https://cdn.firebase.com/libs/firebaseui/2.5.1/firebaseui', 'libs/firebaseui']
    },
    shim: {
        'firebase': {
            exports: 'firebase'
        },
        'firebaseui': {
            exports: 'firebaseui'
        },
    }
});
require(["firebase","firebaseui", "jquery", "test"], function (firebase,firebaseui, Y, test) {
    // "use strict";

    console.log("firebase: ", firebase);  // undefined
    console.log("firebaseui: ", firebaseui);  // undefined
    console.log("jquery: ",$);         // function m(a, b)
    console.log("test: ",test);

    var name = test;
  alert (name);
    Y(document).ready(function(){
        Y("p").click(function(){
            Y(this).hide();
        });
    });
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

      // var config = {
      //   apiKey: "<copy from Firebase Console>",
      //   databaseURL: "<copy from Firebase Console>",
      //   storageBucket: "<copy from Firebase Console>",
      //   authDomain: '<copy from Firebase Console>'
      // };
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
          auth = app.auth(),
          storage = app.storage();

      var databaseRef = database.ref().child('chat');

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
        console.log("You are here GoogleAuth")
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      });
      // Allow the user to sign out
      logout.addEventListener('click', function(e) {
        auth.signOut();
      });
      // When the user signs in or out, update the username we keep for them
      auth.onAuthStateChanged(function(user) {
        if (user) {
          setUsername(user.displayName);
        }
        else {
          // User signed out, set a default username
          setUsername("Web");
        }
      });

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
      file.addEventListener('change', handleFileSelect, false);


      function setUsername(newUsername) {
        if (newUsername == null) {
            newUsername = "Web";
        }
        console.log(newUsername);
        username = newUsername;
        var isLoggedIn = username != 'Web';
        usernameElm.innerText = newUsername;
        logout.style.display = isLoggedIn ? '' : 'none';
        facebookLogin.style.display = isLoggedIn ? 'none' : '';
        googleLogin.style.display = isLoggedIn ? 'none' : '';
      }

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
      }
      //window.app = app; // NOTE: just for debugging
      //for (var i=0; i < 10; i++) addMessage({ name: "Web", message: ''+i });
      setUsername('Web');



});
