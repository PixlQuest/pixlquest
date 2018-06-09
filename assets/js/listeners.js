console.log("listeners.js is online");


define(["jquery", "main"], function ($, fireauth, main) {


$(".loginGoogle").click(function(){
	console.log("Google login clicked!!");
	auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

});



}); //define
