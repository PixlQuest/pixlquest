const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
var sfRef = db.collection('pqRooms').doc('room01');

// sfRef.getCollections().then(collections => {
//     collections.forEach(collection => {
//         console.log('Found subcollection with id:', collection.id);
//     });
// });

// Create a reference to the cities collection
var pqRoomsRef = db.collection('pqRooms');
console.log("rooms: ", pqRoomsRef );
// Create a query against the collection
var roomRef = pqRoomsRef.where('name', '==', 'RM01');
console.log("room: ", roomRef );
//const firestore = require('firebase-firestore');
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  // BGN
  response.send("Hello from Firebase!");
  console.log("Hello console from Firebase!");
  // END
});
exports.categoryController = functions.https.onRequest((request, response) => {
  // BGN
  response.send("Hello from categoryController!");
  console.log("Hello console from categoryController!");
  // END
});
exports.roomController = functions.https.onRequest((request, response) => {
  // BGN
  //response.send("Hello from roomController!");
  console.log("BGN roomController");
  var id = "room01";
  var theRoom01 = db.collection('pqRooms').doc(id).get();
  response.send("theRoom01: " + theRoom01);
  console.log("theRoom01: ", theRoom01);
  console.log("END roomController");
  // END
});
exports.judgeController = functions.https.onRequest((request, response) => {
// BGN judgeController
    // Logging where we are
    //response.send("Hello from judgeController!");
    console.log("Hello console from judgeController!");

    // Testing a room one
    var fromTheRoom = roomController.getRoomName();         // room01.name = "RM01" irebase.firestore().collection('restaurants').doc(id).get();
    var thePlayers  = roomController.getPlayerList(fromTheRoom); // room01.users(will be room01.players) = ["5YVvqEWTkWXHz9rhsyOG","5YVvqEWTkWXHz9rhsyOG","5YVvqEWTkWXHz9rhsyOG"]

    var setIsJudgeFor = function setIsJudgeFor(thePlayers, fromTheRoom) {

      // Set one of the pqUsers who are in a room as a judge
      if (isJudge === false) {


      }; //end if

    } //end setIsJudgeFor

}); // END judgeController
