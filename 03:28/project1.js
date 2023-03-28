var height = 6; 
var width = 5;

var row = 0;
var col = 0;

var gameOver = false;

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
      tile.id = r.toString()+ "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = " ";
      document.getElementById("board").appendChild(tile);
    }
  }
}

// keyboard 

let keyboard = [
["Q","W","E","R","T","Y","U","I","O","P"],
["A","S","D","F","G","H","J","K","L", " "],
["Enter","Z","X","C","V","B","N","M","Del"]
]

for (let i = 0; i < keyboard.length; i++) {
  let currRow = keyboard[i];
  let keyboardRow = document.createElement("div");
  keyboardRow.classList.add("keyboard-row");
  for (let j = 0; j < currRow.length; j++) { // Fixed the syntax error in the loop condition
    let keyTile = document.createElement("div");
    let key = currRow[j];
    keyTile.innerText = key;
    if (key === "Enter") { // Changed the comparison operator to strict equality
      keyTile.id = "Enter";
    } else if (key === "Del") { // Changed the comparison operator to strict equality
      keyTile.id = "Backspace";
    } else if ("A" <= key && key <= "Z") {
      keyTile.id = "Key" + key;
    }
    keyTile.addEventListener("click", processKey);
    if (key === "Enter") {
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
});

