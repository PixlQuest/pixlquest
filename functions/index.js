const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
//var sfRef = db.collection('pqRooms').doc('room01');

// sfRef.getCollections().then(collections => {
//     collections.forEach(collection => {
//         console.log('Found subcollection with id:', collection.id);
//     });
// });

// Create a reference to the cities collection
// var pqRoomsRef = db.collection('pqRooms');
// console.log("rooms: ", pqRoomsRef );
// // Create a query against the collection
// var roomRef = pqRoomsRef.where('name', '==', 'RM01');
// console.log("room: ", roomRef );
//const firestore = require('firebase-firestore');
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  // BGN
  response.send("Hello from Firebase!");
//  console.log("Hello console from Firebase!");
  // END
});
exports.listAllUsers = functions.https.onRequest((request, response) => {
  function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log("user", userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      }
    })
    .catch(function(error) {
      console.log("Error listing users:", error);
    });
}
// Start listing users from the beginning, 1000 at a time.
listAllUsers();
});
exports.categoryController = functions.https.onRequest((request, response) => {
  // BGN
  response.send("Hello from categoryController!");
//  console.log("Hello console from categoryController!");
  // END
});
exports.usersInRoom01 = functions.https.onRequest((request, response) => {
  // BGN
  //response.send("Hello from getRoomName!");
  // VARIABLES
  var name = "pqUsers"; ///pqUsers/5YVvqEWTkWXHz9rhsyOG
  var id = "5YVvqEWTkWXHz9rhsyOG";
  var theRoom01 = db.collection(name); //.collection("teams").whereEqualTo("owners.$uid", true)
  var getDoc = theRoom01.get()
      .then(snapshot => {
          if (!snapshot.exists) {
              console.log('No such document!');
              var obj = {
                "error": "42",
                "message": "No such document!"
              };
              return response.json(obj);
          } else {
              console.log('Document data:', snapshot);

            //  response.send("200", doc.data().name);
            var obj = {};
            obj.name = snapshot.data();
              //return response.status(200).send(obj);
              return response.json(obj);
          }
      })
      .catch(err => {
          console.log('Error getting document', err);
      });

  // END
});
exports.getRoomName = functions.https.onRequest((request, response) => {
  // BGN
  //response.send("Hello from getRoomName!");
  // VARIABLES
  var name = "pqRooms";
  var id = "room01";
  var theRoom01 = db.collection(name).doc(id);
  var getDoc = theRoom01.get()
      .then(doc => {
          if (!doc.exists) {
              console.log('No such document!');
          } else {
              console.log('Document data:', doc.data());
              console.log('room name:', doc.data().name);
            //  response.send("200", doc.data().name);
            var obj = {};
            obj.name = doc.data().name;
              //return response.status(200).send(obj);
              return response.json(obj);
          }
      })
      .catch(err => {
          console.log('Error getting document', err);
      });

  // END
});
exports.getRoomNumOfPlayers = functions.https.onRequest((request, response) => {
  // BGN
  //response.send("Hello from getRoomName!");
  // VARIABLES
  var name = "pqRooms";
  var id = "room01";
  var theRoom01 = db.collection(name).doc(id);
  var getDoc02 = theRoom01.get()
      .then(doc => {
          if (!doc.exists) {
              console.log('No such document!');
          } else {
              console.log('Document data:', doc.data());
              console.log('numberOfPlayers:', doc.data().numOfPlayers);
            //  response.send("200", doc.data().name);
            var obj2 = {};
            obj2.numOfPlayers = doc.data().numOfPlayers;
              //return response.status(200).send(obj);
              return response.json(obj2);
          }
      })
      .catch(err => {
          console.log('Error getting document', err);
      });

  // END
});
exports.roomController = functions.https.onRequest((request, response) => {
  // BGN
  //response.send("Hello from roomController!");
  console.log("--------------------BGN roomController---------------------------");


// getRoomName:{
//   var getDoc = theRoom01.get()
//       .then(doc => {
//           if (!doc.exists) {
//               console.log('No such document!');
//           } else {
//               console.log('Document data:', doc.data());
//               console.log('room name:', doc.data().name);
//             //  response.send("200", doc.data().name);
//             var obj = {};
//             obj.name = doc.data().name;
//               //return response.status(200).send(obj);
//               return response.json(obj);
//           }
//       })
//       .catch(err => {
//           console.log('Error getting document', err);
//       });
//
// }
getRoomNumOfPlayers: {
  var getDoc02 = theRoom01.get()
      .then(doc => {
          if (!doc.exists) {
              console.log('No such document!');
          } else {
              console.log('Document data:', doc.data());
              console.log('room name:', doc.data().numOfPlayers);
            //  response.send("200", doc.data().name);
            var obj2 = {};
            obj.name = doc.data().numOfPlayers;
              //return response.status(200).send(obj);
              return response.json(obj2);
          }
      })
      .catch(err => {
          console.log('Error getting document', err);
      });

}
//console.log(theRoom01);


 // Promise.all([theRoom01]).then(function(snapshots) {
 //   console.log("theRoom00: ", theRoom01);
 //   console.log("theRoom01: ", snapshots);
 //   console.log("theRoom02: ", snapshots[0]);
 //   console.log("theRoom03: ", snapshots[0]._ref);
 //
 //   //response.render("cac", firebaseData);
 //   response.send("theRoom01: " + snapshots.QueryDocumentSnapshot);
 // });


  //response.send("theRoom01: " + theRoom01);
  //console.log("theRoom01: ", theRoom01);
  console.log("-----------------------END roomController-------------------------");
  // END
});
exports.judgeController = functions.https.onRequest((request, response) => {
// BGN judgeController
    // Logging where we are
    //response.send("Hello from judgeController!");
  //  console.log("Hello console from judgeController!");

    // Testing a room one
    var fromTheRoom = roomController.getRoomName();         // room01.name = "RM01" irebase.firestore().collection('restaurants').doc(id).get();
    var thePlayers  = roomController.getPlayerList(fromTheRoom); // room01.users(will be room01.players) = ["5YVvqEWTkWXHz9rhsyOG","5YVvqEWTkWXHz9rhsyOG","5YVvqEWTkWXHz9rhsyOG"]

    var setIsJudgeFor = function setIsJudgeFor(thePlayers, fromTheRoom) {

      // Set one of the pqUsers who are in a room as a judge
      if (isJudge === false) {


      }; //end if

    } //end setIsJudgeFor

}); // END judgeController
