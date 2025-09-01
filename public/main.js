const mathWords = ["trapezoid", "palindrome", "parallelogram", "hexagon", "rectangle", "triangle", "absolute", "inequality", "geometric", "radical"];
const csWords = ["arithmetic", "algorithm", "function", "javascript", "python", "inheritance", "reference", "syntax", "variable"];
const cityWords = ["toronto", "vancouver", "edmonton", "calgary", "halifax", "winnipeg", "saskatoon", "yellowknife", "ottawa", "victoria", "montreal", "kingston", "waterloo", "hamilton", "mississauga", "markham", "charlottetown", "fredericton", "regina", "whitehorse", "iqaluit"];
const usedMathWords = new Set(); const usedCsWords = new Set(); const usedCityWords = new Set();
const wordTag = document.getElementById("word");
let word = "";
let category = "";
const gameStart = document.querySelector(".text__container");
const blankSpace = document.querySelectorAll(".blankSpace");
let input = document.getElementById("input");
const inputKey = document.querySelectorAll(".keyboard__key");
let input1 = "";
const progress = document.getElementById("progress");
const hintButton = document.querySelector(".hint");
const hint = document.getElementById("hint");
const guess = document.getElementById("guess");
let inputButton = document.getElementById("inputButton");
let guessButton = document.getElementById("guessButton");
let wrongChecker = 0;
let correctChecker = 0;
const hangmanPieces = document.querySelectorAll(".hangman__piece");
const displayLetter = document.querySelectorAll(".displayLetter");
const usedLetters = new Set();

function generateWord() {
    gameStart.classList.add("show");
    input.value = "";
    input1 = "";
    input.disabled = false;
    guess.disabled = false;

    // Clean Word Spaces
    blankSpace.forEach(space => {
        space.classList.remove("show");
    });

    // Clean Word Letters
    displayLetter.forEach(displayLetterEach => {
        displayLetterEach.innerHTML = "";
    });
    usedLetters.clear();

    // Clean Keyboard Visual
    inputKey.forEach(key => {
        key.style.backgroundColor = '#9292b1';
        key.style.cursor = "pointer";
        key.style.pointerEvents = "auto";
    });

    // Clean Hangman Visual
    hangmanPieces.forEach(hangmanPiece => {
        hangmanPiece.classList.remove("show");
    });

    // Clean Progress Text
    progress.innerHTML = "";
    wrongChecker = 0;
    correctChecker = 0;

    // Clean Hint
    hint.innerHTML = "";

    if (usedMathWords.size >= mathWords.length) {
        usedMathWords.clear();
    }
    if (usedCsWords.size >= csWords.length) {
        usedCsWords.clear();
    }
    if (usedCityWords.size >= cityWords.length) {
        usedCityWords.clear();
    }

    while (true) {
        const randomCategory = Math.floor(Math.random() * 3);

        if (randomCategory == 0) {
            const randomWord = Math.floor(Math.random() * mathWords.length);
            if (usedMathWords.has(randomWord)) {continue}
            category = "math";
            word = mathWords[randomWord];
            usedMathWords.add(randomWord);
        } else if (randomCategory == 1) {
            const randomWord = Math.floor(Math.random() * csWords.length);
            if (usedCsWords.has(randomWord)) {continue}
            category = "computer science";
            word = csWords[randomWord];
            usedCsWords.add(randomWord);
        } else {
            const randomWord = Math.floor(Math.random() * cityWords.length);
            if (usedCityWords.has(randomWord)) {continue}
            category = "city";
            word = cityWords[randomWord];
            usedCityWords.add(randomWord);
        }

        hintButton.classList.add("show");
        displayWordSpaces();
        break;
    }
}

function displayWordSpaces() {
    for (let i = 0; i <= word.length; i++) {
        blankSpace.forEach(space => {
            const dataSpace = space.getAttribute("data-space");
            if (dataSpace == i) {
                space.classList.add("show");
            }
        });
    }
}

function checkGuess() {
    if (guess.value != word) {
        wrongChecker++;
        hangmanVisual();
    }
    gameOver();
}

function checkLetter() {
    let letter = "";

    if (input1.length == 1) {
        letter = input1;
        input1 = "";
    } else {
        letter = input.value;
    }

    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (letter == word.substring(i, i + 1)) {
                displayLetter.forEach(displayLetterEach => {
                    const letterData = displayLetterEach.getAttribute("data-letter");
                    if (letterData == i) {
                        displayLetterEach.innerHTML = letter;
                        correctChecker++;
                    }
                });
            } else {
            }
        }

    } else {
        wrongChecker++;
        hangmanVisual();
    }

    inputKey.forEach(key => {
        const keyData = key.getAttribute("data-key");
        if (keyData == letter) {
            key.style.backgroundColor = '#91115d';
            key.style.cursor = "default";
            key.style.pointerEvents = "none";
        }
    });

    usedLetters.add(letter);

    gameOver();
}

function gameOver() {
    if (wrongChecker == 6) {
        progress.innerHTML = "Game Over";
        for (let i = 0; i < word.length; i++) {
            displayLetter.forEach(displayLetterEach => {
                const letterData = displayLetterEach.getAttribute("data-letter");
                if (letterData == i) {
                    displayLetterEach.innerHTML = word.substring(i, i + 1);
                }
            });
        }
        inputKey.forEach(key => {
            key.style.cursor = "default";
            key.style.pointerEvents = "none";
        });
        input.value = "";
        inputButton.style.display = "none";
        guess.value = "";
        guessButton.style.display = "none";
        input.disabled = true;
        guess.disabled = true;
    } else if (guess.value == word || correctChecker == word.length) {
        progress.innerHTML = "Correct! You win :)";
        for (let i = 0; i < word.length; i++) {
            displayLetter.forEach(displayLetterEach => {
                const letterData = displayLetterEach.getAttribute("data-letter");
                if (letterData == i) {
                    displayLetterEach.innerHTML = word.substring(i, i + 1);
                }
            });
        }
        inputKey.forEach(key => {
            key.style.cursor = "default";
            key.style.pointerEvents = "none";
        });
        input.value = "";
        inputButton.style.display = "none";
        guess.value = "";
        guessButton.style.display = "none";
        input.disabled = true;
        guess.disabled = true;
    } else {
        input.value = "";
        inputButton.style.display = "none";
        guess.value = "";
        guessButton.style.display = "none";
    }
}

function hangmanVisual() {
    hangmanPieces.forEach(hangmanPiece => {
        const piece = hangmanPiece.getAttribute("data-piece");
        if (piece == wrongChecker) {
            hangmanPiece.classList.add("show");
        }
    });
}

function giveHint() {
    hint.innerHTML = "Word Category: " + category;
}

document.addEventListener("DOMContentLoaded", function () {
    inputKey.forEach(key => {
        key.addEventListener("click", function() {
            const keyData = key.getAttribute("data-key");
            input1 = keyData;
            checkLetter();
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {

    input.addEventListener("input", function() {
        if (input.value.length == 1) {
            inputButton.style.display = "inline-block";
        } else {
            inputButton.style.display = "none";
        }

        if (usedLetters.has(input.value)) {
            inputButton.style.display = "none";
        }
    });

    guess.addEventListener("input", function() {
        if (guess.value.length > 1) {
            guessButton.style.display = "inline-block";
        } else {
            guessButton.style.display = "none";
        }
    });

    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && input.value.length == 1 && usedLetters.has(input.value) == false) {
            checkLetter();
        }
    });

    guess.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && guess.value.length > 1) {
            checkGuess();
        }
    });
});

const section = document.querySelector(".hangman");
const title = document.querySelector(".hangman__title");
const gradientBridge1 = document.querySelector(".gradientBridge1");
const gradientBridge4 = document.querySelector(".gradientBridge4");

document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById('darkModeToggle');

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            section.style.backgroundColor = "#191b28";
            title.style.color = "#fffcef";
            gradientBridge1.style.background = "#191b28";
            gradientBridge4.style.background = "linear-gradient(to top, #fffcef, #191b28)";
            displayLetter.forEach(displayLetterEach => {
                displayLetterEach.style.color = "#fffcef";
            });
            progress.style.color = "#fffcef";
            hint.style.color = "#fffcef";
        } else {
            section.style.backgroundColor = "#fffcef";
            title.style.color = "#040618";
            gradientBridge1.style.background = "linear-gradient(to top, #fffcef, #191b28)";
            gradientBridge4.style.background = "#fffcef";
            displayLetter.forEach(displayLetterEach => {
                displayLetterEach.style.color = "#040618";
            });
            progress.style.color = "#040618";
            hint.style.color = "#040618";
        }
    });
});