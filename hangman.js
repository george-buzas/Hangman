var chosenWord, nrLives = 3, cntCorrectGuesses = 0, rightIndex = 0, wrongIndex = 0, posIndex = 0;
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
               "n", "o", "p", "q", "r", "s", "t", "u", "v", "w" , "x", "y", "z"];
var rightGuesses = [], wrongGuesses = [], charPositions = [];
function getChosenWord() {
  var addedWord = document.getElementById("word-guess").value;
  return addedWord;
}

function addWord() {
  document.getElementById('nrLivesLeft').innerHTML = "You can have " + nrLives + " wrong guesses.";
  chosenWord = getChosenWord();
  var msg = document.getElementById("add-message");
  msg.textContent = "The word has been successfully set. Now, you can play the HANGMAN game.";
  msg.style.color = "green";
}

function setRightGuesses() {
  var msg = document.getElementById("setRightGuesses-message");
  msg.textContent = "Below you can see all the letters contained in the word you want to guess: " + rightGuesses;
  msg.style.color = "blue";
}

function setWrongGuesses() {
  var msg = document.getElementById("setWrongGuesses-message");
  msg.textContent = "Below you can see all the letters that are NOT contained in the word you want to guess: " + wrongGuesses;
  msg.style.color = "red";
}

function getAvailableLetters() {
  var msg = document.getElementById("getAvailableLetters-message");
  msg.textContent = "Below you can see all the letters that might be contained in the word you want to guess: " + letters;
  msg.style.color = "orange";
}

function checkPositions() {
  var msg = document.getElementById("checkPositions-message");
  msg.textContent = "Below you can see the postions at which the letters that you guessed right are located at in the word: ";
  msg.style.color = "green";
  msg.textContent = charPositions;
  msg.style.color = "green";
}

function findLetterWithinWord() {
  document.getElementById('nrLivesLeft').innerHTML = 'You have ' + nrLives + " lives left.";
  var len = chosenWord.length;
  var chosenLetter = document.getElementById("letter-chosen-search").value;
  var info = document.getElementById("search-message");
  if (letters.includes(chosenLetter) && chosenLetter != "!" && cntCorrectGuesses != len && nrLives != 0) {
    var wasFound = 0;
    for (var i = 0; i < len; ++i) {
      if (chosenWord.charAt(i) == chosenLetter) {
        info.textContent = "The letter " + chosenLetter + " is Found in the given word";
        info.style.color = "orange";
        wasFound = 1;
        var j = i + 1;
        charPositions[posIndex] = "Letter " + chosenWord.charAt(i) + " is found at the following index " + j;
        ++posIndex;
        ++cntCorrectGuesses;
        if (cntCorrectGuesses == len) {
          info.textContent = "Congratulations! You won the game!";
          info.style.color = "green";
        }
      }
    }
    letters[chosenLetter.charCodeAt(0) - '97'] = '!';
    if (wasFound == 0) {
      wrongGuesses[wrongIndex] = chosenLetter;
      wrongIndex++;
      --nrLives;
      info.textContent = "The letter " + chosenLetter + " is NOT Found in the given word.";
      info.style.color = "orange";
      document.getElementById('nrLivesLeft').innerHTML = 'You have ' + nrLives + " lives left.";
      if (nrLives == 0) {
        document.getElementById('nrLivesLeft').innerHTML = 'You have ' + nrLives + " lives left.";
        info.textContent = "The letter " + chosenLetter + " is NOT Found in the given word. Computer has won the Game. The word you were trying to guess was: " + chosenWord + ".";
        info.style.color = "red";
      }
    } else {
      rightGuesses[rightIndex] = chosenLetter;
      rightIndex++;
    }
    if (cntCorrectGuesses == len || nrLives == 0) {
      setTimeout(function(){
         window.location.reload(1);
      }, 8000);
    }
  }
} 