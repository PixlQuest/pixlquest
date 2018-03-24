
console.log("Views.js is online");



define(["jquery", "pqcamera"], function ($, pqcamera) {


  //Welcome view with login screen
  this.welcomeView = function(status){

    if(status){
      $(".cont_main").show();
      console.log("welcome view");
    }
    else{
      $(".cont_main").show();
    }

  }

  //Intro view with instructions
  this.introView = function(){
    $("").show();

  }
  this.charlie = function(){
    var charlieIn = 100;
    return charlieIn;
  }

  //hide and show code for waitingRoom
  this.waitingRoomView = function(){
    $("").show();

  }

  //player view with camera and category word
  this.playerView = function(){
    $("").show();

  	cameraSet();
  	//buttons show hide
  }

  //judge view with picture slider of the players images
  this.judgeView = function(){
    $("").show();

  }

  //shows all the final result of the round for 7 seconds before going back to the waiting area
  this.resultView = function(){
    $("").show();

  }

  //Judge Functions
  this.noWinnerView = function(){
    $("").show();

  }

  return this;
});
