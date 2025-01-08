let canvas;
let world;
let keyboard = new Keyboard();
let gameActive = true;
let stoppingGame;
let win = false;
let sound = true;

/**
 * This function specifies what is displayed when the page is first loaded
 */
function firstLoad() {
    document.getElementById('content').innerHTML = renderStartScreen();
    headline = document.getElementById('headline');
    headline.classList.remove('dNone');
}

/**
 * the function returns to the home screen and stops the current game
 */
function backToHome() {
    setTimeout(() => {
        let currentSoundMode = sound;
        muteAllSounds();
        sound = currentSoundMode;
        let content = document.getElementById('content');
        content.style.display = 'flex';
        world.gameRun = false;
        closeCanvas();
        loadStartScreen();
    }, 1000);

}

/**
 * this function initializes the game
 */
function init() {
    changeWindow();
    initLevel();
    world = new World(canvas, keyboard);
    world.gameRun = true;
    stopGame();
    mobileButtons();
    checkSoundMute();
}

function checkSoundMute() {
    let soundIcon = document.getElementById('soundButton');
    if (sound) {
        soundIcon.innerHTML = renderMuteButton();
    } else {
        soundIcon.innerHTML = renderEndmuteButton();
        muteAllSounds();
    }
}

/**
 * This function allows you to switch between start, game or end screen windows
 */
function changeWindow() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('content');
    headline = document.getElementById('headline');
    overlay = document.getElementById('gameOverlay');
    canvas.classList.remove('dNone');
    headline.classList.add('dNone');
    startScreen.style.display = 'none';
    overlay.style.display = 'flex';
}

/**
 * This event checks when a key is pressed
 */
window.addEventListener('keydown', (event) => {
    keyboard.keyOnUes = true;
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * This event checks when a key is released
 */
window.addEventListener('keyup', (event) => {
    keyboard.keyOnUes = false;
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * This function gives the mobile button control for mobile phones their respective function
 */
function mobileButtons() {
    document.getElementById('moveLeft').addEventListener('touchstart', () => keyboard.LEFT = true);
    document.getElementById('moveLeft').addEventListener('touchend', () => keyboard.LEFT = false);
    document.getElementById('moveLeft').addEventListener('touchstart', () => keyboard.keyOnUes = true);
    document.getElementById('moveLeft').addEventListener('touchend', () => keyboard.keyOnUes = false);
    document.getElementById('moveRight').addEventListener('touchstart', () => keyboard.RIGHT = true);
    document.getElementById('moveRight').addEventListener('touchend', () => keyboard.RIGHT = false);
    document.getElementById('moveRight').addEventListener('touchstart', () => keyboard.keyOnUes = true);
    document.getElementById('moveRight').addEventListener('touchend', () => keyboard.keyOnUes = false);
    document.getElementById('throwBottle').addEventListener('touchstart', () => keyboard.D = true);
    document.getElementById('throwBottle').addEventListener('touchend', () => keyboard.D = false);
    document.getElementById('jump').addEventListener('touchstart', () => keyboard.SPACE = true);
    document.getElementById('jump').addEventListener('touchend', () => keyboard.SPACE = false);
}

/**
 * this function stops the game
 */
function stopGame() {
    stoppingGame = setInterval(() => {
        setTimeout(() => {
            checkForWin();
            checkForLose();
        }, 100);
    }, 100);
}

/**
 * function to mute all sounds
 */
function muteAllSounds() {
    let soundButton = document.getElementById('soundButton');
    soundButton.innerHTML = renderEndmuteButton();
    world.enableGameSound = false;
    world.character.ObjectSounds = false;
    sound = false;
}

/**
 * function to activate all sounds
 */
function endmuteAllSounds() {
    let soundButton = document.getElementById('soundButton');
    soundButton.innerHTML = renderMuteButton();
    world.enableGameSound = true;
    world.character.ObjectSounds = true;
    sound = true;
}

/**
 * function to check if you have won
 */
function checkForWin() {
    world.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss) {
            if (enemy.energy == 0) {
                setTimeout(() => {
                    gameActive = false;
                    win = true;
                    loadEndScreen();
                    let currentSoundMode = sound;
                    muteAllSounds();
                    sound = currentSoundMode;
                    clearInterval(stoppingGame);
                }, 1000);
            }
        }
    });
}

/**
 * function to check if you have lost
 */
function checkForLose() {
    if (world.character.energy == 0) {
        setTimeout(() => {
            win = false;
            loadEndScreen();
            let currentSoundMode = sound;
            muteAllSounds();
            sound = currentSoundMode;
            clearInterval(stoppingGame);
        }, 1000);
    }

}

/**
 * function to load the final screen
 */
function loadEndScreen() {
    closeCanvas();
    mainScreen = document.getElementById('content');
    mainScreen.style.display = 'flex';
    document.getElementById('content').innerHTML = renderEndScreen();
    if (win == false) {
        openLoseScreen();
    }
}

/**
 * function to load the start screen
 */
function loadStartScreen() {
    document.getElementById('content').innerHTML = renderStartScreen();
    closeCanvas();
}

/**
 * function to load the Controleinfowindow
 */
function loadControleInfo() {
    let mainScreen = document.getElementById('content');
    mainScreen.innerHTML = renderControleInfo();
}

/**
 * function to close the game
 */
function closeCanvas() {
    canvas = document.getElementById('canvas');
    overlay = document.getElementById('gameOverlay');
    startScreen = document.getElementById('startScreen');
    document.webkitExitFullscreen();
    canvas.classList.add('dNone');
    overlay.style.display = 'none';
}

/**
 * function to open the lose game display
 */
function openLoseScreen() {
    mainScreen = document.getElementById('content');
    content = document.getElementById('endScreen');
    content.classList.add('loseScreen');
    content.classList.remove('winScreen');
    mainScreen.style.display = 'flex';

}

/**
 * function to switch to fullscreen
 */
function fullScreen() {
    let canvas = document.getElementById('canvas');
    canvas.requestFullscreen();
}