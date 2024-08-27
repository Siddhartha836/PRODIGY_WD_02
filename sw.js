let startTime, updatedTime, difference, tInterval, running = false;
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function lapTimer() {
    const lapTime = display.textContent;
    const lapElement = document.createElement('li');
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const time = new Date(updatedTime);
    const minutes = ('0' + time.getUTCMinutes()).slice(-2);
    const seconds = ('0' + time.getUTCSeconds()).slice(-2);
    const milliseconds = ('00' + time.getUTCMilliseconds()).slice(-3, -1);
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
