// ============ WORDLE GAME ============
const TARGET_WORD = "PHATASS";
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 7;

let currentGuess = "";
let attempts = 0;
let gameWon = false;
let guesses = [];

// CONNECTIONS GAME DATA
const CONNECTIONS_DATA = {
    groups: [
        {
            name: "BRAINROT",
            items: ["Tung Tung Tung Sahur", "Ballerina Cappucina", "Bombardino Crocodilo", "Tralalero Tralala"],
            color: "#FFB6C1"
        },
        {
            name: "PLACES WE'VE BEEN TO ON A DATE",
            items: ["Scene 92", "Nueplex", "Xanders", "Mcdonalds"],
            color: "#87CEEB"
        },
        {
            name: "PET NAMES",
            items: ["Sleepyhead", "Bubs", "Darling", "Sly Bunny"],
            color: "#DDA0DD"
        },
        {
            name: "DEROGATORY RACIAL SLURS",
            items: ["Coon", "Jigaboo", "Boy", "Nigger"],
            color: "#FFD700"
        }
    ]
};

let connectionsState = {
    items: [],
    selected: new Set(),
    mistakes: 4,
    solved: [],
    gameWon: false
};

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    initializeWordle();
    setupWordleKeyboard();
    setupPhysicalKeyboard();
    setupNextButton();
    setupConnectionsButtons();
});

// ============ WORDLE FUNCTIONS ============
function initializeWordle() {
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

function setupWordleKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'key';
        
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
        setupWordleKeyboard();
    }
}

function handleDelete() {
    currentGuess = currentGuess.slice(0, -1);
    drawBoard();
    setupWordleKeyboard();
}

function handleSubmit() {
    if (currentGuess.length !== WORD_LENGTH) {
        showWordleMessage('Word must be 7 letters!', 'error');
        return;
    }
    
    const guess = currentGuess.split('');
    const result = [];
    const targetArray = TARGET_WORD.split('');
    const targetCount = {};
    
    targetArray.forEach(letter => {
        targetCount[letter] = (targetCount[letter] || 0) + 1;
    });
    
    guess.forEach((letter, i) => {
        if (letter === targetArray[i]) {
            result[i] = { letter, status: 'correct' };
            targetCount[letter]--;
        } else {
            result[i] = { letter, status: null };
        }
    });
    
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
    
    if (currentGuess === TARGET_WORD) {
        gameWon = true;
        showWordleMessage('🎉 You got it! Unlocking your birthday surprise...', 'success');
        setTimeout(() => unlockBirthday(), 1500);
    } else if (attempts >= MAX_ATTEMPTS) {
        showWordleMessage(`Game Over! The word was ${TARGET_WORD}`, 'error');
    } else {
        showWordleMessage(`${MAX_ATTEMPTS - attempts} attempts remaining`, 'info');
    }
    
    currentGuess = '';
    drawBoard();
    setupWordleKeyboard();
}

function showWordleMessage(msg, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = msg;
    messageEl.className = type;
}

function unlockBirthday() {
    document.getElementById('wordle-page').classList.add('hidden');
    document.getElementById('birthday-page').classList.remove('hidden');
    createConfetti();
    const audio = document.getElementById('background-music');
    audio.play().catch(() => console.log('Audio autoplay prevented'));
}

function setupNextButton() {
    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', () => {
        document.getElementById('birthday-page').classList.add('hidden');
        document.getElementById('connections-page').classList.remove('hidden');
        initializeConnections();
    });
}

// ============ CONNECTIONS GAME ============
function initializeConnections() {
    connectionsState = {
        items: [],
        selected: new Set(),
        mistakes: 4,
        solved: [],
        gameWon: false
    };
    
    CONNECTIONS_DATA.groups.forEach(group => {
        group.items.forEach(item => {
            connectionsState.items.push({
                text: item,
                group: group.name,
                color: group.color
            });
        });
    });
    
    shuffleArray(connectionsState.items);
    drawConnectionsGrid();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drawConnectionsGrid() {
    const grid = document.getElementById('connections-grid');
    grid.innerHTML = '';
    
    connectionsState.items.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = 'connections-item';
        btn.textContent = item.text;
        btn.dataset.index = index;
        
        if (connectionsState.selected.has(index)) {
            btn.classList.add('selected');
        }
        
        const isSolved = connectionsState.solved.some(group => 
            group.items.some(solvedItem => solvedItem.text === item.text)
        );
        
        if (isSolved) {
            btn.classList.add('solved');
            btn.style.backgroundColor = item.color;
            btn.disabled = true;
        }
        
        btn.addEventListener('click', () => toggleSelection(index));
        grid.appendChild(btn);
    });
    
    updateMistakesDisplay();
}

function toggleSelection(index) {
    if (connectionsState.selected.has(index)) {
        connectionsState.selected.delete(index);
    } else {
        if (connectionsState.selected.size < 4) {
            connectionsState.selected.add(index);
        }
    }
    drawConnectionsGrid();
}

function setupConnectionsButtons() {
    document.getElementById('deselect-btn').addEventListener('click', () => {
        connectionsState.selected.clear();
        drawConnectionsGrid();
    });
    
    document.getElementById('submit-btn').addEventListener('click', submitConnections);
    
    document.getElementById('shuffle-btn').addEventListener('click', () => {
        shuffleArray(connectionsState.items);
        connectionsState.selected.clear();
        drawConnectionsGrid();
    });
}

function submitConnections() {
    if (connectionsState.selected.size !== 4) {
        showConnectionsMessage('Select exactly 4 items', 'error');
        return;
    }
    
    const selectedItems = Array.from(connectionsState.selected).map(i => connectionsState.items[i]);
    const selectedGroups = new Set(selectedItems.map(item => item.group));
    
    if (selectedGroups.size === 1) {
        // Correct group found
        const groupName = Array.from(selectedGroups)[0];
        const correctGroup = CONNECTIONS_DATA.groups.find(g => g.name === groupName);
        
        connectionsState.solved.push({
            name: groupName,
            items: selectedItems,
            color: correctGroup.color
        });
        
        connectionsState.items = connectionsState.items.filter(item => 
            !connectionsState.solved.some(group => 
                group.items.some(solvedItem => solvedItem.text === item.text)
            )
        );
        
        connectionsState.selected.clear();
        showConnectionsMessage('✅ Correct!', 'success');
        
        if (connectionsState.solved.length === 4) {
            connectionsState.gameWon = true;
            setTimeout(() => unlockGallery(), 1500);
        } else {
            setTimeout(() => drawConnectionsGrid(), 500);
        }
    } else if (selectedGroups.size === 4) {
        // All different groups
        connectionsState.mistakes--;
        connectionsState.selected.clear();
        showConnectionsMessage('All different!', 'error');
        if (connectionsState.mistakes <= 0) {
            showConnectionsMessage('Game Over!', 'error');
        } else {
            setTimeout(() => drawConnectionsGrid(), 500);
        }
    } else {
        // Mixed groups
        connectionsState.mistakes--;
        connectionsState.selected.clear();
        showConnectionsMessage('One away...', 'warning');
        if (connectionsState.mistakes <= 0) {
            showConnectionsMessage('Game Over!', 'error');
        } else {
            setTimeout(() => drawConnectionsGrid(), 500);
        }
    }
}

function showConnectionsMessage(msg, type) {
    const messageEl = document.getElementById('connections-message');
    messageEl.textContent = msg;
    messageEl.className = type;
}

function updateMistakesDisplay() {
    document.getElementById('mistakes').textContent = connectionsState.mistakes;
}

function unlockGallery() {
    document.getElementById('connections-page').classList.add('hidden');
    document.getElementById('gallery-page').classList.remove('hidden');
    createConfetti();
}

// ============ CONFETTI ============
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
