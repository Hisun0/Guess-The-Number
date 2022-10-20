let randomNumber = Math.floor((Math.random(100) * 100) + 1);
let input = document.querySelector('input');
const button = document.getElementById('btn');
const guess = document.querySelector('.guesses');
let totalAttempts = document.querySelector('.attempts');
let count = 1;
const arrayOfAttempts = [];
const header = document.querySelector('header');
const gameField = document.querySelector('.game');
const restartButton = document.getElementById('restart');

function guessingNumber() {
    const inputValue = Number(input.value);
    arrayOfAttempts.push(inputValue);

    totalAttempts.textContent = `Your attempts: ${arrayOfAttempts.join(', ')}`;

    if (count === 10) {
        guess.textContent = 'Game over!';
        gameOver();
    } else if (inputValue < randomNumber) {
        guess.textContent = 'Wrong! Try greater.';
    } else if (inputValue > randomNumber) {
        guess.textContent = 'Wrong! Try less.';
    } else {
        guess.textContent = 'You are absolutely right!';
        win();
    }


    count++;
    input.value = '';
}

button.addEventListener('click', guessingNumber);

function gameOver() {
    button.style.display = 'none';
    header.style.background = "red";
    gameField.style.background = "red";
    restartButton.style.display = 'block';
}

function win() {
    button.style.display = 'none';
    header.style.background = "#20AA6B";
    gameField.style.background = "#20AA6B";
    restartButton.style.display = 'block';
}

function restartGame() {    
    count = 1;

    randomNumber = Math.floor((Math.random(100) * 100) + 1);
    input.value = '';

    restartButton.style.display = 'none';
    button.style.display = 'block';
    guess.textContent = '';
    arrayOfAttempts.length = 0;
    totalAttempts.textContent = '';
    header.style.background = "#e5e5e5";
    gameField.style.background = "#e5e5e5";
}

restartButton.addEventListener('click', restartGame);

    




