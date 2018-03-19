/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

var errorElement = document.querySelector('#errorMsg');
var video = document.querySelector('video');
  var canvas = document.querySelector('canvas'); // holder for photo
//    var context = canvas.getContext('2d');
    var context = canvas.getContext('2d');

// variables for later use.
var w, h, ratio;

canvas.width = 200;
canvas.height = 200;


$(".videoCam").show();
$(".picture").hide();

/*
switching cameras
var front = false;
document.getElementById('flip-button').onclick = function() { front = !front; };
*/

// Put variables in global scope to make them available to the browser console.
var constraints = window.constraints = {
  audio: false,
  video: { facingMode: "environment" }
};

//when a picture is taken do the following
var snap = function() {
      // Define the size of the rectangle that will be filled (basically the entire element)
      context.fillRect(0, 0, 200, 200);
      // Grab the image from the video
      context.drawImage(video, 0, 0, 200, 200);

      $(".videoCam").hide();
      $(".picture").show();
    }








function handleSuccess(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);

  stream.oninactive = function() {
    console.log('Stream inactive');
  };
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
 // document.getElementById("gum-local").height = "200px";
 console.log( document.getElementById("gum-local").width );


}







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

function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);