require.config({
    paths: {
        'jquery': "assets/js/jquery-3.3.1.min",
        'views': "assets/js/views",
        'listeners': "assets/js/listeners",
        'gameLogic': "assets/js/gameLogic",
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

var exports = {};
var bravo = "bravo china";
  //Views
exports.bravo = bravo;

require(["firebase","fireauth","firedatabase","firestorage","firestore","firebaseui", "webrtc", "views", "listeners", "gameLogic", "pqcamera", "jquery", "views"], function (
  firebase, fireauth, firedatabase, firestorage, firestore, firebaseui, webrtc, view, listeners, gameLogic, pqcamera, $, view) {
//console.log("webrtc: ", webrtc);
//console.log("pqcamera: ", pqcamer a);
  // On page elements naming
});
