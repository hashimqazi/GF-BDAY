// PASSWORD CONFIGURATION - Change this to your desired password
const CORRECT_PASSWORD = "CHANGE_ME"; // Update this with your password

document.getElementById('submit').addEventListener('click', checkPassword);
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function checkPassword() {
    const input = document.getElementById('password').value;
    const errorMsg = document.getElementById('error');
    
    if (input === CORRECT_PASSWORD) {
        // Correct password - show birthday page
        document.getElementById('password-page').classList.add('hidden');
        document.getElementById('birthday-page').classList.remove('hidden');
        errorMsg.classList.add('hidden');
        
        // Optional: Add confetti animation
        createConfetti();
    } else {
        // Wrong password - show error
        errorMsg.classList.remove('hidden');
        document.getElementById('password').value = '';
    }
}

function createConfetti() {
    // Simple confetti animation
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    for (let i = 0; i < 50; i++) {
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
        
        const duration = Math.random() * 2000 + 2000;
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