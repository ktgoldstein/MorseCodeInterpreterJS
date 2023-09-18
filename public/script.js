
//edit below var to toggle debug messages on/off.
var DEBUG_MODE = false;
var map = new Map();
createDictionary();

//function for debugging statements; can easily be toggled on and off
function DB(s) {
    if (DEBUG_MODE) {
        console.log("JSON: "+JSON.stringify(s));
        console.log("Non: "+ s);
    }
}

function translateText(userMorse) {
    var morseWords = getMorseWords(userMorse);
    var translated = '';
    for (let i = 0; i < morseWords.length; i++) {
        translated += translateWord(morseWords[i]);
        if (i < morseWords.length-1) {
            translated += " "; //no space if it's the last word
        }
    }
    DB(translated);
    return translated;
}

function getMorseWords(input) {
    DB("getMorseWords: input string: " + input)
    var words = input.split("   ");
    for (let i = 0; i < words.length; i++) {
        DB("getMorseWords: " + words[i] +" with size " + words.length);
    }
    return words;
}

function translateWord(word) {
    var morseChars = word.split(" ");
    var english = "";
    for (let i = 0; i < morseChars.length; i++) {
        english += translateCharacter(morseChars[i]);
    }
    DB("translateWord: " + english);
    return english;
 }

 function translateCharacter(morseChar) {
    var transChar = map.get(morseChar);
    if (transChar == null) {
        var error = "ERROR in finding translation of char: " + morseChar + "\nPlease try again.";
        DB(error);
        alert(error);
        document.getElementById("answer").textContent = ''; //resets answer area to blank
    }
    DB("translateCharacter: " + transChar.charAt(0));
    //using charAt prevents the invisible \r character 
    //from being returned as part of the string and breaking output later on
    return transChar.charAt(0);
 }

function morseToEnglish() {
    var userMorse = document.getElementById("morseInput").value;
    var translatedText = translateText(userMorse);
    var answerField = document.getElementById("answer");
    answerField.textContent = translatedText;
}

//These functions only deal with creating the Map:
function createDictionary() {
    //Get the contents of this local file. 
    var fileName = 'MorseToEnglishDictionary.txt';
    fetch(fileName)
    .then((response) => response.text())
    .then((text) => {
        createMap(text);
    });}

function createMap(txt) {
        //split by row
        var myArray = txt.split("\n");
        for (let i = 0; i < myArray.length; i++) {
            //then split by "term/definition"
            let subArray = myArray[i].split(" ");
            map.set(subArray[0], subArray[1]);
        }
}