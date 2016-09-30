// By Wilson LUA, ING5, SI2

/*
*	Function map
*	Input - text : the string to map
*/
function map(text){
	var result = []; // the result that will be send to be shuffled and sorted
	
	// words is the result of the split of the parameter "text" that normally is a string, 
	// and we split it with space and dots, so words is an array with every word of "text"
	var words = text.split(/[ .]/); 
	
	for (var i=0, l=words.length; i<l; i++){
		var word = words[i]; // putting the word in a variable to be used later, if used multiple time
		if (word != ""){ // when splitting, it may occur that we have an empty string, for example if the word terminates by "."
			var wordAndOccurence = {}; // this is used to store the word as a key and the occurence as value
			wordAndOccurence[word] = 1; // set the occurence to 1
			result.push(wordAndOccurence); // add every pair (key,value) to the result array
		}
	}
	
	shuffleAndSort(result); // call the shuffle and sort function of the framework
}

/*
*	Function reduce
*	Input - wordAndOccurence : object (key,value) which key represent the word, and the value is the array of occurences of the word
*/
function reduce(wordAndOccurence){
	var word; // used to store the word
	var occurence = 0;// used to store the occurence of the word
	
	for (var key in wordAndOccurence){ // we loop on "wordAndOccurence"
		word = key; // we know that it's only one word so we get it for later
		var numberOccurence = wordAndOccurence[key]; // we store the array of the occurences to be used in the following loop
		for (var i=0, l=numberOccurence.length; i<l; i++){
			occurence += numberOccurence[i]; //we add every occurence into the final result
		}
	}
	
	outputWriter(word, occurence); //call the output writer to display the results
}