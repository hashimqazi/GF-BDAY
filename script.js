// WORDLE CONFIGURATION
const TARGET_WORD = "PHATASS";
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 7;

let currentGuess = "";
let attempts = 0;
let gameWon = false;
let guesses = [];

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupKeyboard();
    setupPhysicalKeyboard();
});

function initializeGame() {
    drawBoard();
}

function drawBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        
        for (let j = 0; j < WORD_LENGTH; j++) {
            const cell = document.createElement('div');
            cell.className = 'wordle-cell';
            
            if (guesses[i] && guesses[i][j]) {
                cell.textContent = guesses[i][j].letter;
                cell.classList.add(guesses[i][j].status);
            } else if (i === attempts && currentGuess[j]) {
                cell.textContent = currentGuess[j];
                cell.classList.add('current');
            }
            
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function setupKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'key';
        
        // Mark used letters
        guesses.forEach(guess => {
            guess.forEach(cell => {
                if (cell.letter === letter) {
                    button.classList.add(cell.status);
                }
            });
        });
        
        button.addEventListener('click', () => handleKeyPress(letter));
        keyboard.appendChild(button);
    });
    
    // Add special keys
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '⌫ DELETE';
    deleteBtn.className = 'key special';
    deleteBtn.addEventListener('click', () => handleDelete());
    keyboard.appendChild(deleteBtn);
    
    const enterBtn = document.createElement('button');
    enterBtn.textContent = 'ENTER';
    enterBtn.className = 'key special';
    enterBtn.addEventListener('click', () => handleSubmit());
    keyboard.appendChild(enterBtn);
}

function setupPhysicalKeyboard() {
    document.addEventListener('keydown', (e) => {
        const letter = e.key.toUpperCase();
        if (/^[A-Z]$/.test(letter) && !gameWon) {
            handleKeyPress(letter);
        } else if (e.key === 'Backspace' && !gameWon) {
            handleDelete();
        } else if (e.key === 'Enter' && !gameWon) {
            handleSubmit();
        }
    });
}

function handleKeyPress(letter) {
    if (currentGuess.length < WORD_LENGTH && attempts < MAX_ATTEMPTS && !gameWon) {
        currentGuess += letter;
        drawBoard();
        setupKeyboard();
    }
}

function handleDelete() {
    currentGuess = currentGuess.slice(0, -1);
    drawBoard();
    setupKeyboard();
}

function handleSubmit() {
    if (currentGuess.length !== WORD_LENGTH) {
        showMessage('Word must be 7 letters!', 'error');
        return;
    }
    
    const guess = currentGuess.split('');
    const result = [];
    const targetArray = TARGET_WORD.split('');
    const targetCount = {};
    
    // Count letters in target
    targetArray.forEach(letter => {
        targetCount[letter] = (targetCount[letter] || 0) + 1;
    });
    
    // First pass: mark greens
    guess.forEach((letter, i) => {
        if (letter === targetArray[i]) {
            result[i] = { letter, status: 'correct' };
            targetCount[letter]--;
        } else {
            result[i] = { letter, status: null };
        }
    });
    
    // Second pass: mark yellows and grays
    guess.forEach((letter, i) => {
        if (result[i].status === null) {
            if (targetCount[letter] > 0) {
                result[i].status = 'present';
                targetCount[letter]--;
            } else {
                result[i].status = 'absent';
            }
        }
    });
    
    guesses[attempts] = result;
    attempts++;
    
    // Check if won
    if (currentGuess === TARGET_WORD) {
        gameWon = true;
        showMessage('🎉 You got it! Unlocking your birthday surprise...', 'success');
        setTimeout(() => unlockBirthday(), 1500);
    } else if (attempts >= MAX_ATTEMPTS) {
        showMessage(`Game Over! The word was ${TARGET_WORD}`, 'error');
    } else {
        showMessage(`${MAX_ATTEMPTS - attempts} attempts remaining`, 'info');
    }
    
    currentGuess = '';
    drawBoard();
    setupKeyboard();
}

function showMessage(msg, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.className = type;
}

function unlockBirthday() {
    document.getElementById('wordle-page').classList.add('hidden');
    document.getElementById('birthday-page').classList.remove('hidden');
    createConfetti();
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#ff6b9d'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        let top = -10;
        const interval = setInterval(() => {
            top += 3;
            confetti.style.top = top + 'px';
            if (top > window.innerHeight) {
                clearInterval(interval);
                confetti.remove();
            }
        }, 16);
    }
}
