document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  let numTries = 6;

  const h1 = document.createElement("h1");
  h1.textContent = "Guessing Game!";
  h1.style.marginTop = "13rem";

  const h3 = document.createElement("h3");
  h3.innerHTML =
    "<h3>The rules are simple: you have 6 attempts to guess a number from 1 to 100.</h3><p>Hint: Guess Smarter, not Harder!</p>";

  body.append(h1, h3);
  body.style.textAlign = "center";

  const _answer = Math.floor(Math.random() * 100) + 1;

  const table = document.createElement("table");
  body.appendChild(table);

  // Apply CSS styles to make the table visible
  table.style.borderCollapse = "collapse";
  table.style.margin = "20px auto"; // Centering the table
  table.style.border = "2px solid black";

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

  const button = document.createElement("button");
  button.addEventListener("click", gameOn);
  button.textContent = "Start Game!";
  body.appendChild(button);

  // Function to start the game
  function gameOn() {
    let attemptsLeft = numTries;
    console.log(_answer);

    function makeGuess() {
      if (attemptsLeft > 0) {
        let userGuess = parseInt(
          window.prompt(
            `Guess a number from 1 - 100\nAttempts left: ${attemptsLeft}`
          ),
          10
        );

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
          alert("Invalid input! Please enter a number between 1 and 100.");
          makeGuess(); // Recursively call for another attempt
          return;
        }

        if (userGuess === _answer) {
          alert("🎉 Congratulations! You guessed the right number!");
          highlightCorrectAnswer(userGuess);
        } else {
          notAnswer(userGuess, _answer);
          alert(`Incorrect guess! You have ${attemptsLeft - 1} attempts left.`);
          attemptsLeft--;

          if (attemptsLeft === 0) {
            alert(`Game over! The correct number was ${_answer}.`);
          } else {
            setTimeout(() => makeGuess(), 300); // Ask for another guess
          }
        }
      }
    }

    makeGuess(); // Start the guessing again recursion
  }

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
});
