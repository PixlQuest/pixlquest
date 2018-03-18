

console.log("category.js is online");
//webpack 
/*
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://wordsapiv1.p.mashape.com/words/soliloquy")
.header("X-Mashape-Key", "pixlquest_5aad2b74e4b06ec3937b47d2")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
*/

navigator.getUserMedia(
    // Options
    {
        video: true
    },
    // Success Callback
    function(stream){

        // Create an object URL for the video stream and
        // set it as src of our HTLM video element.
        video.src = window.URL.createObjectURL(stream);

        // Play the video element to show the stream to the user.
        video.play();

    },
    // Error Callback
    function(err){

        // Most common errors are PermissionDenied and DevicesNotFound.
        console.error(err);

    }
);




$.ajaxPrefilter(function(options) {
    if (options.crossDomain && $.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});


$.ajax({
	url: "https://wordsapiv1.p.mashape.com/words/soliloquy",
	type: "GET",
	headers: {
		"X-Mashape-Key": "kFWOTAiw6YmshGt5R6EBnRzw6nmwp1DoErOjsnD3v6fuX1UDzz",
		"Accept": "application/json"
	},
	success: function(result){
		console.log(result);
	},
	error: function(result){
		console.log(result);
	}
});

