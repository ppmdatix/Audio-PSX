let words = [
"le bouchon.m4a",
"le souper.m4a",
"le rondin.m4a",
"le grumeau.m4a",
"le rebut.m4a",
"le glaçon.m4a",
"le réchaud.m4a",
"le coffret.m4a",
"le gamin.m4a",
"le clavier.m4a",
"le râteau.m4a",
"le donjon.m4a",
"le sergent.m4a",
"le crémier.m4a",
"le niveau.m4a",
"le refrain.m4a",
"le veston.m4a",
"le forban.m4a",
"le bûcher.m4a",
"le cachotm4a"

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
