const sounds = [
    '../static/audio/sounds/Applaudissements.mp3',
    '../static/audio/sounds/Battements-de-coeur.mp3',
    '../static/audio/sounds/Clavier-d-ordinateur.mp3',
    '../static/audio/sounds/Crayon-papier.mp3',
    '../static/audio/sounds/Docteur-Maboul.mp3',
    '../static/audio/sounds/Fantome.mp3'
];

let grid = document.getElementById('grid');
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let currentPlayer = 1;
let score1 = 0;
let score2 = 0;
let pairsFound = 0;

const gameGrid = sounds.concat(sounds).sort(() => 0.5 - Math.random());

function createGrid() {
    gameGrid.forEach((sound, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.sound = sound;
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        grid.appendChild(cell);
    });
    updatePlayerHighlight();
}

function handleCellClick(event) {
    let clicked = event.target;

    if (
        clicked === previousTarget ||
        clicked.classList.contains('found-player1') ||
        clicked.classList.contains('found-player2') ||
        clicked.classList.contains('selected')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.dataset.sound;
            clicked.classList.add('selected');
            playSound(firstGuess);
        } else {
            secondGuess = clicked.dataset.sound;
            clicked.classList.add('selected');
            playSound(secondGuess);
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
                pairsFound++;
                if (currentPlayer === 1) {
                    score1++;
                    document.getElementById('score1').textContent = score1;
                } else {
                    score2++;
                    document.getElementById('score2').textContent = score2;
                }
            } else {
                setTimeout(resetGuesses, delay);
                switchPlayer();
            }
        }
        previousTarget = clicked;
    }

    if (pairsFound === sounds.length) {
        setTimeout(endGame, delay);
    }
}

function match() {
    let selected = document.querySelectorAll('.selected');
    selected.forEach(cell => {
        cell.classList.add(currentPlayer === 1 ? 'found-player1' : 'found-player2');
        cell.classList.remove('selected');
    });
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    selected.forEach(cell => {
        cell.classList.remove('selected');
    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updatePlayerHighlight();
}

function updatePlayerHighlight() {
    document.getElementById('player1').classList.toggle('active', currentPlayer === 1);
    document.getElementById('player2').classList.toggle('active', currentPlayer === 2);
}

function playSound(sound) {
    let audio = new Audio(sound);
    audio.currentTime = 0; // Rewind to the start
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, 3000); // Play only for 3 seconds
}

function endGame() {
    let result = document.getElementById('result');
    if (score1 > score2) {
        result.textContent = 'Joueur 1 gagne!';
    } else if (score2 > score1) {
        result.textContent = 'Joueur 2 gagne!';
    } else {
        result.textContent = 'Égalité!';
    }
}

createGrid();
