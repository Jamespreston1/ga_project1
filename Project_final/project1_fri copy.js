// initial set up 
var height = 6; 
var width = 5;

var row = 0;
var col = 0;

var gameOver = false;

// set the word lists
var wordList = ["apple","mango","river","hyped","tokyo","title","ouija"]
var guessList = ["apple","mango","river","hyped","tokyo","title","ouija","carbo","proxy"]

guessList = guessList.concat(wordList);

var word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();
console.log(word);

window.onload = function(){
  initialize();
}

function initialize() {
  for (let r = 0; r < height; r++){

    for (let c = 0; c < width; c++){

      let tile = document.createElement("span");
      tile.id = r.toString()+"-"+ c.toString();
      tile.classList.add("tile");
      tile.innerText = " ";
      document.getElementById("board").appendChild(tile);
    }
  } // This curly brace was missing in your original code

  // keyboard creation
  let keyboard = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L", " "],
    ["Enter","Z","X","C","V","B","N","M","Del"]
  ]

  for (let i = 0; i < keyboard.length; i++) {
    let currRow = keyboard[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for (let j = 0; j < currRow.length; j++) {
      let keyTile = document.createElement("div");
      let key = currRow[j];
      keyTile.innerText = key;
      if (key == "Enter") {
        keyTile.id = "Enter";
      } else if (key == "") {
        keyTile.id = "Del";
      } else if ("A" <= key && key <= "Z") {
        keyTile.id = "Key" + key;
      }
      keyTile.addEventListener("click", processKey);

      if (key == "Enter") {
        keyTile.classList.add("enter-key-tile");
      } else {
        keyTile.classList.add("key-tile");
      }
      keyboardRow.appendChild(keyTile);
    }
    document.body.appendChild(keyboardRow);
  }

  document.addEventListener("keyup", (e) => {
    processInput(e);
  })
}

function processKey(event) {
  e = {"code" : this.id,"letter":event.target.innerText};
 
  processInput(e);

}

function processInput(e) {
  if (gameOver) return;

console.log(e.code);
 if (e.code == "KeyDel"){
    if(0 < col && col <= width){
      col-=1;
    }
    let currTile = document.getElementById(row.toString()+'-'+col.toString());
    currTile.innerText = "";
  }
  else if (e.code == "Enter"){
    update();
  } else {
  if (col < width) {
    let currTile = document.getElementById(row.toString() +"-"+ col.toString());
    if(currTile.innerText == ""){
      currTile.innerText = e.letter;
      col+=1
    }
  }
  }
  // define when the game is over and you're out of guesses

  if(!gameOver && row== height){
  gameOver = true;
  document.getElementById("answer").innerText = word;
  } 
}

function update () {
let guess = "";

document.getElementById("answer").innerText = "";

// string the guesses into a row 

for (let c = 0; c < width; c++){
  let currTile = document.getElementById(row.toString()+'-'+c.toString());
 
  let letter = currTile.innerText;

  guess += letter;
}
// update the value of guess and log it 
guess = guess.toLowerCase();
console.log(guess);



// process the guess we have 

let correct = 0;
/*
let letterCount = {}; // keep track of letter frequency
for (let i = 0; i < word.length; i++) {
  let letter = word[i];
  if (letterCount[letter]){
    letterCount[letter]+=1;
  }
  else {
    letterCount[letter] = 1;
  }
}  */


for (let c = 0; c < width; c++){
  let currTile = document.getElementById(row.toString()+'-'+c.toString());
  let letter = currTile.innerText;
  // class list of correct will be used to change background color of element

  if(word[c] == letter){
    currTile.classList.add("correct");

    let keyTile = document.getElementById("Key" + letter);
    keyTile.classList.remove("present");
    keyTile.classList.add("correct");
    correct += 1;
    // letterCount[letter] -= 1;
  }
  else  if (word.includes(letter)){
      currTile.classList.add("present");

      let keyTile = document.getElementById("Key" + letter);
      if(!keyTile.classList.contains("correct")){
        keyTile.classList.add("present");


      }
      //letterCount[letter] -= 1;
    }
  
    else{
      currTile.classList.add("absent");
      let keyTile = document.getElementById("Key" + letter);
      keyTile.classList.add("absent")   
    }  
  }

  if (correct == width){
    gameOver = true;
  }
  row += 1;
col = 0
}



