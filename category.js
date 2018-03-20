console.log("category.js is online");






$.ajaxPrefilter(function(options) {
    if (options.crossDomain && $.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});




$.ajax({
	url: "https://wordsapiv1.p.mashape.com/words/?random=true",
	type: "GET",
	headers: {
		"X-Mashape-Key": "kFWOTAiw6YmshGt5R6EBnRzw6nmwp1DoErOjsnD3v6fuX1UDzz",
		"Accept": "application/json"
	},
	success: function(result){
		console.log(result);
        console.log(result.word);

        $(".catWord").text(result.word);
	},
	error: function(result){
		console.log(result);
	}
});

