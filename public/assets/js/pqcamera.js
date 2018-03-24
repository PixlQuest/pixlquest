
define(["jquery", "main", "views"],function ($, main, view) {
  console.log("pqcamera is online");





//
// cameraObj = {};
// setCategoryInView = localStorage.setItem('the_obj', JSON.stringify(cameraObj));
//
  // IF CAMERA NEEDS TO BE TURNED ON
  console.log("####################################");
  //console.log("BRAVO from pqcamera: " + main.bravo );
  console.log("####################################");


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

        // Define the size of the rectangle that will be filled (basically the entire element)

        context.fillRect(0, 0, w, h);
        // Grab the image from the video
        context.drawImage(video, 0, 0, w, h);

        var savedPic = canvas.toDataURL();
        console.log(savedPic);

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
      };
      img.src = savedPic;
      uploadPic(savedPic);

      //Stop the camera after photo is taken
      var tracks = stream.getTracks();

      tracks.forEach(function(track) {
        track.stop();
      });  //tracks
    //uploa  var uploadTask = storageRef.child('images/' + "apple").put(blob);
}

      function uploadPic(savedPic) {
            var file = savedPic;

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
            }); //upload task
          } //upload pic


  navigator.mediaDevices.getUserMedia(constraints)
  .then(handleSuccess).catch(handleError);

  $( "#snap" ).click(function() {
    snap();
  }); //snap




// return this;
} //camera function
}); //define
