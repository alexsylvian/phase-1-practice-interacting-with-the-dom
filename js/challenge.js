const timer = document.getElementById('counter')
const minus = document.getElementById('minus')
const plus = document.getElementById('plus')
const heart = document.getElementById('heart')
const pause = document.getElementById('pause')
const reset = document.getElementById('reset')
const submit = document.getElementById('submit')
const input = document.getElementById('comment-input')
const list = document.getElementById('list')
let likesList = document.querySelector('.likes')
let likeCounts = {}
let likedNumbers = []

function updateTimer() {
    timer.innerText++
}

function runTimer() {
    intervalID = setInterval(updateTimer, 1000)
}
runTimer()

minus.addEventListener('click', () => {
    timer.innerText--
})
plus.addEventListener('click', () => {
    updateTimer()
})
reset.addEventListener('click', () => {
    timer.innerText = 0
})
pause.addEventListener('click', () => {
    if(intervalID) {
        clearInterval(intervalID)
        intervalID = 0
        pause.textContent = 'resume'
        minus.disabled = true;
        reset.disabled = true;
        plus.disabled = true;
        heart.disabled = true;
    }else{
        runTimer()
        pause.textContent = 'pause'
        minus.disabled = false;
        reset.disabled = false;
        plus.disabled = false;
        heart.disabled = false;
    }
})

function updateMessages() {
    const currentNumber = timer.textContent;

    if (!likedNumbers.includes(currentNumber)) {
        likedNumbers.push(currentNumber);
        likeCounts[currentNumber] = 1;

        const likeNote = document.createElement('li');
        likeNote.setAttribute('data-number', currentNumber);
        likeNote.textContent = `${currentNumber} has been liked 1 time!`;
        likesList.appendChild(likeNote);
    } else {
        likeCounts[currentNumber]++;
        const existingNote = document.querySelector(`li[data-number="${currentNumber}"]`);
        existingNote.textContent = `${currentNumber} has been liked ${likeCounts[currentNumber]} time${likeCounts[currentNumber] > 1 ? 's' : ''}!`;
    }
}

heart.addEventListener('click', updateMessages)


submit.addEventListener('click', (e) => {
    e.preventDefault()
    const comment = document.createElement('li') 
    comment.textContent = input.value
    list.appendChild(comment)
    input.value = ''
})

