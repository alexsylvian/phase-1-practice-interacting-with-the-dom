const chai = require("chai");
global.expect = chai.expect;
const jsdom = require("mocha-jsdom");

jsdom({});

const timer = document.getElementById('counter');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const heart = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const reset = document.getElementById('reset');
const likesList = document.getElementById('likes-list');
let intervalID;
let pause = false;

let likeCounts = {}; // Object to store the count of likes for each number

function updateTimer() {
  timer.innerText++;
}

function runTimer() {
  intervalID = setInterval(updateTimer, 1000);
}
runTimer();

minus.addEventListener('click', () => {
  timer.innerText--;
});

plus.addEventListener('click', () => {
  updateTimer();
});

reset.addEventListener('click', () => {
  timer.innerText = 0;
});

pauseButton.addEventListener('click', () => {
  if (intervalID) {
    clearInterval(intervalID);
    intervalID = 0;
  } else {
    runTimer();
  }
});

function updateMessages() {
  const currentNumber = timer.textContent;
  if (!likeCounts[currentNumber]) {
    likeCounts[currentNumber] = 1;
  } else {
    likeCounts[currentNumber]++;
  }

  const likeNote = document.createElement('li');
  likeNote.textContent = `${currentNumber} has been liked ${likeCounts[currentNumber]} time${likeCounts[currentNumber] > 1 ? 's' : ''}!`;
  likesList.appendChild(likeNote);
}

heart.addEventListener('click', updateMessages);


minus.disabled = false
reset.disabled = false
plus.disabled = false
heart.disabled = false
