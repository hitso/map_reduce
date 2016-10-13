// By Wilson LUA, ING5, SI2

var textSample = "this is an example for testing the map and reduce functions. i made sure it only has one occurence per word hehe";


/*
*	Function mapAndReduce
*/
function mapAndReduce(){
	var sentences = textSample.split(/\./); // create array of each sentences of the text, splitted by "."
	for (var i=0, l=sentences.length; i<l; i++){
		map(sentences[i]); //map each sentence
	}
}


/*
*	Function shuffleAndSort, from the framework but i don't implement it so it just goes to reduce
*	Input - wordAndOccurence : array containing every pair (key, value) where key is the word and value is the occurence
*/
function shuffleAndSort(wordAndOccurence){
	for (var i=0, l=wordAndOccurence.length; i<l; i++){
		reduce(wordAndOccurence[i]);
	}
}

/*
*	Function outputWriter
*	Input - word : the word, occurence: the number of time it appears
*/
function outputWriter(word, occurence){
	var displayedMessage =  "\"" + word + "\" appears " + occurence + " time(s)";
	var ul = document.getElementById("display");
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(displayedMessage));
	ul.append(li);
}

/*
*	Function map
*	Input - text : the string to map
*/
function map(text){
	var result = []; // the result that will be send to be shuffled and sorted
	
	// split each word of the sentence, separated by space
	var words = text.split(" "); 
	
	for (var i=0, l=words.length; i<l; i++){
		var word = words[i]; // putting the word in a variable to be used later, if used multiple time
		var wordAndOccurence = {}; // this is used to store the word as a key and the occurence as value
		wordAndOccurence[word] = 1; // set the occurence to 1
		result.push(wordAndOccurence); // add every pair (key,value) to the result array
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
		/*var numberOccurence = wordAndOccurence[key]; // we store the array of the occurences to be used in the following loop
		for (var i=0, l=numberOccurence.length; i<l; i++){
			occurence += numberOccurence[i]; //we add every occurence into the final result
		}*/
		
		// after edit, the previous commented part was my vision of the 'normal' function, but now i didn't manage to get an array of occurences
		// the way i did it in shuffleAndSort, so basically i only have {word: occurence} and not {word: [occurence]}
		occurence += wordAndOccurence[key]; 
	}
	
	outputWriter(word, occurence); //call the output writer to display the results
}

document.addEventListener("DOMContentLoaded", function(event){mapAndReduce();});