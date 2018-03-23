
console.log("Views.js is online");



define(["jquery"], function ($) {


  //Views

  //Welcome view with login screen
  this.welcomeView = function(){
     $(".sect_top_brand").hide();
     console.log("test worked");
  }

  //Intro view with instructions
  var introView = function(){

  }

  //hide and show code for waitingRoom
  var waitingRoomView = function(){

  }

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

  //Judge Functions
  var noWinnerView = function(){

  }

  return this;
});
