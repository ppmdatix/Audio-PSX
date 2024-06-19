let words = [
    "Zigouigoui.m4a",
    "Bric-à-brac.m4a",
    "Farfelu.m4a",
    "Tintamarre.m4a",
    "Quiproquo.m4a",
    "Tralalère.m4a",
    "Gribouille.m4a",
    "Zonzon.m4a",
    "Brouhaha.m4a",
    "Chichiteux.m4a"
];

let shuffledWords = shuffleArray(words);
let currentWordIndex = 0;
let volume = 1.0;
let score = 0;
let maxScore = 5;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    console.log("Le jeu commence");
    document.getElementById('word-result').textContent = '';
    document.getElementById('start').style.display = 'none'; // Cacher le bloc de boutons de réponse

    playWord();
}

function playWord() {
    if (currentWordIndex < shuffledWords.length) {
        let audio = new Audio(`../static/audio/words/${shuffledWords[currentWordIndex]}`);
        audio.volume = volume;
        console.log(`Lecture du mot : ${shuffledWords[currentWordIndex]} avec un volume de ${volume}`);
        audio.play().then(() => {
            console.log("L'audio est joué");
        }).catch((error) => {
            console.error("Erreur lors de la lecture de l'audio : ", error);
        });
        audio.onended = function() {
            document.getElementById('word-container').textContent = `Mot actuel : ${shuffledWords[currentWordIndex].split('.')[0]}`;
            document.getElementById('word-result').textContent = `Vous en êtes à ${Math.round(score)} points.`;
        };
    } else {
        endGame();
    }
}

function stopGame() {
    endGame();
}

function continueGame() {
    volume = Math.max(0.001, volume / 2.5);
    currentWordIndex++;
    if (volume > 0 && currentWordIndex < shuffledWords.length) {
        playWord();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('word-result').textContent = ` Jeu terminé. Votre score final est ${Math.round(score)} point(s).`;
    document.getElementById('answer-buttons').style.display = 'none'; // Cacher le bloc de boutons de réponse

}

function playerGuessedCorrectly() {
    if (score < maxScore) {
        score += Math.random();
    }
    document.getElementById('word-result').textContent = `Vous en êtes à ${Math.round(score)} points.`;
    continueGame();
}

function playerGuessedCorrectlyAndStop() {
    if (score < maxScore) {
        score += Math.random();
    }
    document.getElementById('word-result').textContent = `Bravo, vous avez gagné ${Math.round(score)} points. Vous pouvez quitter cette page 😉`;
    document.getElementById('answer-buttons').style.display = 'none'; // Cacher le bloc de boutons de réponse

}



function playerGuessedIncorrectly() {
    document.getElementById('word-result').textContent = `Dommage. Vous marquez 0 point. Vous pouvez quitter cette page 😮`;
    document.getElementById('answer-buttons').style.display = 'none'; // Cacher le bloc de boutons de réponse


}
