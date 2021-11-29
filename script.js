const wordElement = document.getElementById('word');
const incorrectLettersElement = document.getElementById('incorrect-letters');
const repeatNotif = document.getElementById('repeat-letter-notif');
const finalNotif = document.getElementById('final-notif');
const finalMessage = document.getElementById('final-message');
const finalWordReveal = document.getElementById('final-word-reveal');
const playAgainButton = document.getElementById('play-button');


const figureParts = document.querySelectorAll('.figure-part');

import { wordList } from './words.js';

var play = true;
var selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordElement.innerHTML = `${selectedWord.split('').map(letter => 
        `<span class='letter'>
          ${correctLetters.includes(letter) ? letter : '' }
        </span>`
    ).join('')}`;

    const wordDisplay = wordElement.innerText.replace(/[ \n]/g, ''); // get current word from user

    if (wordDisplay === selectedWord) {
        // win condition
        play = false
        finalNotif.style.display = 'flex';
        finalMessage.innerHTML = 'You win!';
        finalWordReveal.innerHTML = `The word was ${selectedWord}..`
    }
}

function updateWrongLetters() {
    incorrectLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<span>Wrong Letters:</span>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // display the man
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;
		if (index < errors) { part.style.display = 'block'; }
        else { part.style.display = 'none'; };
	});

    if (wrongLetters.length === figureParts.length) {
        // lose game
        play = false;
        finalNotif.style.display = 'flex';
        finalMessage.innerHTML = 'You lose :(';
        finalWordReveal.innerHTML = `The word was ${selectedWord}..`
    };
}

function showRepeatLetterNotif() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

window.addEventListener('keydown', e => {
    if (play && e.key.charCodeAt() >= 97 && e.key.charCodeAt() <= 122) {
        const letter = e.key.toLowerCase();

        if (selectedWord.includes(letter)) {
            if (correctLetters.includes(letter)) {
                // show repeat letter popup
                showRepeatLetterNotif();
            } else {
                // add to correct letters, displayWord
                correctLetters.push(letter);
                displayWord();
            }
        } else {
            if (wrongLetters.includes(letter)) {
                // show repeat letter popup
                showRepeatLetterNotif();
            } else {
                // add to wrong letters, updateWrongLetters
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }
});

playAgainButton.addEventListener('click', () => {
	play = true;

	//  empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

	displayWord();

	updateWrongLetters();

	finalNotif.style.display = 'none';
});

displayWord();


