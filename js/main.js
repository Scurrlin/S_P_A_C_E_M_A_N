/*----- constants -----*/
const MAX_WRONG_GUESSES = 5;
const WORDS = [
  'black hole',
  'planets',
  'space force',
  'light speed',
  'interstellar',
  'exploration',
  'cosmic',
  'sputnik',
  'gravity',
  'asteroid',
  'galaxy',
  'star'
];

let wrongGuesses;
let secret;
let guess;
let gameStatus;

const replayBtn = document.getElementById('play-again-btn');
const guessEl = document.getElementById('guess');
const spacemanImg = document.querySelector('img');
const letterBtns = [...document.querySelectorAll('article > button')];
const msgEl = document.querySelector('h2');

document.querySelector('article')
  .addEventListener('click', handleLetterClick);
replayBtn.addEventListener('click', init);

init();

function init() {
  wrongGuesses = [];
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  secret = WORDS[rndIdx].toUpperCase().split('');
  guess = secret.map(ltr => ltr === ' ' ? ' ' : '_');
  gameStatus = null;
  render();
}

function render() {
  renderMessage();
  spacemanImg.src = `imgs/spaceman-${wrongGuesses.length}.jpg`;
  guessEl.textContent = guess.join('');
  renderButtons();
}

function renderMessage() {
  if (gameStatus === 'W') {
    msgEl.textContent = 'You Guessed the Secret Word!';
  } else if (gameStatus === 'L') {
    msgEl.innerHTML = `You're Out in Space :(<br>The word was ${secret.join('')}`;
  } else {
    msgEl.textContent = `${MAX_WRONG_GUESSES - wrongGuesses.length + 1} Wrong Guesses Remain - Good Luck!`;
  }
}

function renderButtons() {
  letterBtns.forEach(function(btn) {
    const ltr = btn.textContent;
    if (wrongGuesses.includes(ltr)) {
      btn.className = 'wrong';
    } else if (guess.includes(ltr)) {
      btn.className = 'correct';
    } else {
      btn.className = '';
    }
  });
  replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
}

function handleLetterClick(evt) {
  const ltr = evt.target.textContent;
  if (
    gameStatus ||
    !letterBtns.includes(evt.target) ||
    wrongGuesses.includes(ltr) ||
    guess.includes(ltr)
  ) return;

  if ( secret.includes(ltr) ) {
    secret.forEach(function(char, idx) {
      if (char === ltr) guess[idx] = ltr;
    });
  } else {
    wrongGuesses.push(ltr);
  }

  gameStatus = getGameStatus();
  render();
}

function getGameStatus() {
  if (!guess.includes('_')) return 'W';
  if (wrongGuesses.length > MAX_WRONG_GUESSES) return 'L';
  return null;
}
