// Constants
const MONEY_PER_HOUR = 13;
const MONEY_PER_SECOND = MONEY_PER_HOUR / 3600;

// State
let state = {
    isRunning: false,
    isPaused: false,
    elapsedSeconds: 0,
    money: 0,
    intervalId: null
};

// DOM Elements
const timer = document.getElementById('timer');
const moneyDisplay = document.getElementById('money-display');
const startStopBtn = document.getElementById('start-stop');
const pauseBtn = document.getElementById('pause');
const showSecondsToggle = document.getElementById('show-seconds');

// Formatting Functions
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (showSecondsToggle.checked) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatMoney(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Update Display
function updateDisplay() {
    timer.textContent = formatTime(state.elapsedSeconds);
    moneyDisplay.textContent = formatMoney(state.money);
}

// Timer Controls
function startTimer() {
    if (state.intervalId) return;
    
    state.intervalId = setInterval(() => {
        if (!state.isPaused) {
            state.elapsedSeconds++;
            state.money += MONEY_PER_SECOND;
            updateDisplay();
        }
    }, 1000);
}

function stopTimer() {
    if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null;
    }
}

function resetTimer() {
    stopTimer();
    state.elapsedSeconds = 0;
    state.money = 0;
    updateDisplay();
}

// Button Updates
function updateButtons() {
    startStopBtn.textContent = state.isRunning ? 'Stop' : 'Start';
    pauseBtn.textContent = state.isPaused ? 'Resume' : 'Pause';
    pauseBtn.disabled = !state.isRunning;
}

// Event Listeners
startStopBtn.addEventListener('click', () => {
    state.isRunning = !state.isRunning;
    
    if (state.isRunning) {
        startTimer();
    } else {
        resetTimer();
        state.isPaused = false;
    }
    
    updateButtons();
});

pauseBtn.addEventListener('click', () => {
    if (!state.isRunning) return;
    
    state.isPaused = !state.isPaused;
    updateButtons();
});

showSecondsToggle.addEventListener('change', () => {
    updateDisplay();
});

// Initial display update
updateDisplay();
updateButtons();