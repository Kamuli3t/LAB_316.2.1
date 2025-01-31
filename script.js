const body = document.querySelector("body");
let numTries = 6;

const h1 = document.createElement("h1");
h1.textContent = "Guessing Game!";

const h3 = document.createElement("h3");
h3.innerHTML =
  "<h3>The rules are simple, in 6 attempts try to guess a number from 1 to 100.<h3> <p> Hint: Guess Smarter, not Harder!</p>";

body.append(h1, h3);
body.style.textAlign = "center";

const _answer = Math.floor(Math.random() * 100) + 1;

const table = document.createElement("table");
body.appendChild(table);

// Apply CSS styles to make the table visible
table.style.borderCollapse = "collapse";
table.style.marginTop = "20px";

let counter = 1;
for (let i = 0; i < 10; i++) {
  let row = document.createElement("tr");
  table.appendChild(row);

  for (let j = 0; j < 10; j++) {
    let column = document.createElement("td");
    column.textContent = counter;
    counter++;

    // Set styles for each cell
    column.style.width = "50px";
    column.style.height = "30px";
    column.style.textAlign = "center";
    column.style.border = "1px solid black";

    row.appendChild(column);
  }
}

// Game ON!
// Number guessing logic
setTimeout(() => {
  while (numTries > 0) {
    let userGuess = parseInt(window.prompt("Guess a number from 1 - 100"), 10);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      alert("Invalid input! Please enter a number between 1 and 100.");
      // if so, Skip the rest of the loop and ask again
      continue;
    }

    if (userGuess === _answer) {
      alert("🎉 Congratulations! You guessed the right number!");
      highlightCorrectAnswer(userGuess);
      break;
    } else {
      alert(`Incorrect guess! You have ${numTries - 1} attempts left.`);
      notAnswer(userGuess, _answer);
    }

    if (numTries === 0) {
      alert(`Game over! The correct number was ${_answer}.`);
    }
    numTries--;
  }
}, 5000);

// Function to mark incorrect guesses
function notAnswer(userGuess, _answer) {
  const cells = document.querySelectorAll("td");

  const index = userGuess - 1;

  if (userGuess < _answer) {
    for (let i = 0; i <= index && i < cells.length; i++) {
      cells[i].style.backgroundColor = "red";
    }
  } else {
    for (let i = index; i < cells.length; i++) {
      cells[i].style.backgroundColor = "red";
    }
  }
}

// Function to highlight the correct answer
function highlightCorrectAnswer(answer) {
  const cells = document.querySelectorAll("td");
  cells[answer - 1].style.backgroundColor = "green";
}
