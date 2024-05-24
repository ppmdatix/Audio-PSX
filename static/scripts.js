const audioFilePathsAlike = [
    '../static/audio/alike/do-do.mp3',
    '../static/audio/alike/fa-sol.mp3',
    '../static/audio/alike/re-si.mp3'
];

const audioFilePathsLas = [
    '../static/audio/las/8.mp3',
    '../static/audio/las/10.mp3',
    '../static/audio/las/12.mp3',
    '../static/audio/las/15.mp3',
    '../static/audio/las/17.mp3'
];

const audioFilePathsSounds = [
    '../static/audio/sounds/Applaudissements.mp3',
    '../static/audio/sounds/Battements-de-coeur.mp3',
    '../static/audio/sounds/Clavier-d-ordinateur.mp3',
    '../static/audio/sounds/Crayon-papier.mp3',
    '../static/audio/sounds/Docteur-Maboul.mp3',
    '../static/audio/sounds/Fantome.mp3',
    '../static/audio/sounds/Gifles-Baffes-Claques.mp3',
    '../static/audio/sounds/Miaulement-de-chat.mp3',
    '../static/audio/sounds/Paparazzis.wav',
    '../static/audio/sounds/Pas-dans-la-neige.mp3',
    '../static/audio/sounds/Petit-ruisseau.mp3',
    '../static/audio/sounds/Rouge-gorge.mp3',
    '../static/audio/sounds/Servir-du-vin.mp3',
    '../static/audio/sounds/Tonnerre.mp3',
    '../static/audio/sounds/Vinyle.mp3'
];

function getRandomAudioFilePath(folder) {
    const goodList = folder === "alike" ? audioFilePathsAlike : folder === "las" ? audioFilePathsLas : audioFilePathsSounds;
    if (goodList.length > 0) {
        const index = Math.floor(Math.random() * goodList.length);
        return goodList[index];
    } else {
        console.error('No audio files are available in the specified folder.');
        return '';  // Optionally handle this more gracefully
    }
}

function loadNewAudio(folder) {
    const audioPlayer = document.getElementById('myAudio');
    const audioSource = document.getElementById('audioSource');
    audioSource.src = getRandomAudioFilePath(folder);
    audioPlayer.load();

}

function playAudio(folder) {
    const audioPlayer = document.getElementById('myAudio');
    const audioSource = document.getElementById('audioSource');
    if (!audioSource.src) {
        loadNewAudio(folder);
    } 
    audioPlayer.play();
    
}



function getFileNameWithoutExtension(path) {
    return path.split('/').pop().replace('.mp3', '');
}


function revealAnswerAlike() {
    const audioSource = document.getElementById('audioSource');
    alert('Les 2 notes jouées étaient : ' + getFileNameWithoutExtension(audioSource.src) + ' !');
}

function revealAnswerLa() {
    const audioSource = document.getElementById('audioSource');
    const fileName = getFileNameWithoutExtension(audioSource.src);
    alert('Il y a ' + fileName + ' notes !');
}

function revealAnswerSounds() {
    const audioSource = document.getElementById('audioSource');
    const fileName = getFileNameWithoutExtension(audioSource.src);
    alert('Le son provient de ' + fileName + ' !');
}



let questions = [
    "Ki i li prisidi di li ripibliki ?",
    "Kul u lu culur du chuvul blu d'Huru kutr ?",
    "Kaba da bass a la chama ?",
    "Ké lé lé méhére édéprétésést d'Énnéçé ?"
];

let answers = [
    "Iminil Micri",
    "Blu",
    "Da",
    "Séfé Bért !"
];

let currentQuestionIndex = Math.floor(Math.random() * questions.length);
let questionsDisplayed = 0;

function loadQuestion() {
    const questionContainer = document.getElementById('question');
    if (questionsDisplayed < 3) {
        questionContainer.innerHTML = '<div class="question">Question:     ' + questions[currentQuestionIndex] + '</div><div class="answer">Réponse: ' + answers[currentQuestionIndex] + '</div>';
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        questionsDisplayed++;
    } else {
        questionContainer.innerHTML = "<div class='no-more-questions'>les 3 questions sont terminées !</div>";
    }
}



