let hintPara = document.querySelector("#hintSpan");
let gauss = document.querySelector("#gaussSpan");
let btns = document.querySelectorAll(".btn-container button");
let dashes = document.querySelector(".word-dashes");
let popupModel = document.querySelector(".game-end-popup-backside-dark");
let popupImg = document.querySelector("#popupImg");
let popupHeading = document.querySelector("#popupHeading");
let popupPara = document.querySelector("#popupPara");
let wordToGauss = "";
let moves = 0;
let maxMoves = 6;
let wordArray = [];

function getWord() {
  //word and hint from word.js file.
  let rand = Math.floor(Math.random() * wordList.length);
  wordToGauss = wordList[rand].word;
  let hintFromObject = wordList[rand].hint;
  //word in uppercase for conditional purposes
  wordUpper = wordToGauss.toUpperCase();
  //hint displayer
  hintPara.innerText = hintFromObject;

  //create dashes according to word length
  for (let i = 0; i < wordToGauss.length; i++) {
    let sp = document.createElement("span");
    sp.innerText = "_";
    dashes.appendChild(sp);
  }
}

//getWord function is called
getWord();

//button event listner for all btns
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    findChar(e.target, btn.innerText);
  });
});

//findChar function
function findChar(target, letterCliked) {
  if (wordUpper.includes(letterCliked)) {
    [...wordUpper].forEach((letter, index) => {
      if (letter === letterCliked) {
        wordArray.push(letter);
        dashes.querySelectorAll("span")[index].innerText = letter;
      }
    });
  } else {
    moves++;
    document
      .querySelector("img")
      .setAttribute("src", `images/hangman-${moves}.svg`);
  }

  if (moves < maxMoves) {
    gauss.innerText = moves;
  } else if (moves == maxMoves) {
    gauss.innerText = moves;
  }

  //disabling buttons
  target.disabled = true;

  //gameover or winning upon hitting conditions any one of the folowing
  if (moves === maxMoves) {
    return gameOver(false);
  }
  if (wordUpper.length === wordArray.length) {
    return gameOver(true);
  }
}

//gameover function
const gameOver = (isVictory) => {
  setTimeout(() => {
    popupImg.src = `images/${isVictory ? "victory" : "lost"}.gif`;
    popupHeading.innerText = `${isVictory ? "Congrats!" : "Game Over!"}`;
    popupPara.innerHTML = isVictory
      ? `You found the word: <b>${wordToGauss}</b>`
      : `The correct word was: <b>${wordToGauss}</b>`;
    popupModel.classList.remove("noneDisplay");
  }, 500);
};

// Reset game function
const resetGame = () => {
  // Reset variables
  wordToGauss = "";
  moves = 0;
  wordArray = [];
  gauss.innerText = moves;

  // Clear dashes
  dashes.innerHTML = "";

  // Reset hangman image
  document.querySelector("img").setAttribute("src", `images/hangman-0.svg`);

  // Enable all buttons
  btns.forEach((btn) => {
    btn.disabled = false;
  });

  // Hide popup
  popupModel.classList.add("noneDisplay");

  // Get a new word
  getWord();
};

// Add event listener to play again button
document.querySelector("#play-again").addEventListener("click", resetGame);
