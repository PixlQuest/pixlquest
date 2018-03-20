//console.log("category.js is online");

/*
	Using the Datamuse API (https://www.datamuse.com/api/) to access nouns that are associated 
	with different colors to come up with the category word.
*/

var hold;
var WordObject;
var colors = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Indigo", "Violet", "Purple", "Magenta", "Pink", "Brown", "White", "Gray", "Black"];



//Helps to pick a random color from the colors array
var randomColor = function(){
	var rColor = Math.floor(Math.random() * 15);
	//console.log(colors[rColor]);
	return colors[rColor];
}

//pick random word from the returned object
var wordCategory = function(result){
	var listTotal = result.length;
	//console.log(result.length);

	var rWord = Math.floor(Math.random() * listTotal);
	return result[rWord].word;
}



//USE ONLY WITH LOCAL HOST FOR TESTING NOT THE ACTUAL GITPAGE SERVER
$.ajaxPrefilter(function(options) {
    if (options.crossDomain && $.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});


//Make a call to the Datamuse API
$.ajax({
	url: "https://api.datamuse.com/words?rel_jja=" + randomColor(),
	type: "GET",

success: function(result){
    $(".catWord").text( wordCategory(result) );

	//debugging
	//console.log(result);
	//hold = result;
},
error: function(result){
	//console.log("it dont work" + result);
}


});

