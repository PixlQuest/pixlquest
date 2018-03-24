
define(["jquery"],function ($) {



  console.log("pqcamera is online");

  // IF CAMERA NEEDS TO BE TURNED ON
var useCamera = false;

//if(useCamera){

  var errorElement = document.querySelector('#errorMsg');
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas'); // holder for photo
  var context = canvas.getContext('2d');

  // variables for later use.
  var w, h, ratio;


  //starting state of the camera
  //$(".videoCam").show();
  //$(".picture").hide();






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
        // Define the size of the rectangle that will be filled (basically the entire element)
        context.fillRect(0, 0, w, h);
        // Grab the image from the video
        context.drawImage(video, 0, 0, w, h);

        //Stop the camera after photo is taken
        var tracks = stream.getTracks();

        tracks.forEach(function(track) {
          track.stop();
        });


        $(".videoCam").hide();
        $(".picture").show();
      }

  navigator.mediaDevices.getUserMedia(constraints)
  .then(handleSuccess).catch(handleError);

  $( "#snap" ).click(function() {
    snap();
  });



//}

});
