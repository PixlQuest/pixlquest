//1. USER LOGS INTO WEBSITE BY DEFAULT THE WELCOME VIEW IS SETUP ON THE PAGE BY DEFAULT
console.log("gameLogic is online");


define(["jquery", "views", "main"],function ($, view, main) {

  //When first accessing the page go to welcome section
  view.welcomeView();



//  console.log(view);


/*




//If user clicks on more info button
$( "#moreInfo" ).click(function() {
	//Set the view to the intro info section
  	introView();
});

$("#goBacktoWelcomePage").click(function(){
	//go back to the welcome page
	welcomeView();
});

//2. USER AUTHENTICATES
		//On line 156 js put in the waiting room view to get the user into the waiting room



//LISTENER NEEDED
//###A Need to know the player id
//###B Need to know the player room number assigned
//###C Need to know number of players in assigned room


//3. USER IS IN THE WAITING ROOM

// if the currently assigned waiting room has 3 players
if(roomAssigned.length == 3){

	//###D Need a new category word from database api function here
	newGame();
	playerJudgeViewDecider();
}


//4. USER IS NOW A PLAYER OR A JUDGE IN AN ACTIVE GAME

//a. The Players

//If user clicks on more info button
$( "#takePhotoBtn" ).click(function() {
	//save the photo and go to the results view
  	savePhoto();
  	resultView();
});


//b. The Judge

//###D Listener is needed to pull any pictures submitted

 /*
 DBListenerFunction: if new picture added{
	addPictureToJudge();
 }
 */

/*
//If judge X's a picture
$( "#btnSetBad" ).click(function() {
	//###E Delete current picture from firecloud
	//delete photo from webpage go to next photo

	if(noPhotoLeft)
	{
		//###E noPlayerWins room variable set to true send this info to the database
	}
});

//###F Listener needed here to show room variable noPlayerWins from the database
//call function: noWinner();





//If judge checkmarks a picture
$( "#btnSetWinner" ).click(function() {
	//save the photo and go to the results view
	//###G Send winner result to firebase (picture should have a user id attached to it)
	//###H Set gameOver firebase room variable to true
});

//###I Listener needed here to show room database gameover variable from the database
//call function: gameOver();


//5. MOVE USER TO RESULTS PAGE

if(gameOver || noWinner){

	roundEnd();
}

/*
//Views

//Welcome view with login screen
var welcomeView = function(){
   $(".sect_top_brand").hide();
}

//Intro view with instructions
var introView = function(){

}

//hide and show code for waitingRoom
var waitingRoomView = function(){

}
*/
/*
//### Need to know if the specific player/computer record judge value set to true or false
var playerJudgeViewDecider = function(judgeValueForPlayer){

	if(judgeValueForPlayer == true){
		judgeView();
	}
	else{
		playerView();
	}
}

/*
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


var newGame = function(){

}

/////////////////////////////
//Judge Functions
var noWinnerView = function(){

}
*/

/*
var gameOver = function(gameOverVariable){

	if (gameOverVariable){
		resultView();
	}
}
/////////////////////////////



/////////////////////////////
//Camera Functions

//Give user camera capability
var cameraSet = function(){
	//camera code
}

//save photo and send it to the database
var savePhoto = function(){

}
/////////////////////////////



//Moves user from results page to new game or waiting room
var afterResults = function(){
	clearInterval(timeThis);

	//If there are 3 players
	if(###playerCount == 3){
		newGame();
		playerJudgeViewDecider();
	}
	else{
			waitingRoomView(); //go to the waiting room view
		}
}

var roundEnd() = function(){

		//show results view for 7 seconds
		var timeThis = setInterval( resultView(), 1000);

		//send user to new game or waiting room via afterResults Function
		setTimeout(afterResults, 7000);
	}
*/
});
