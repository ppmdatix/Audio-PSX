const audioFilePathsAlike = [
    '../static/audio/alike/do-do.mp3',
    '../static/audio/alike/fa-sol.mp3',
    '../static/audio/alike/re-si.mp3'
];

const audioFilePathsLas = [
    '../static/audio/las/14.mp3'
];

const audioFilePathsSounds = [
    '../static/audio/sounds/Applaudissements.mp3',
    '../static/audio/sounds/Battements-de-coeur.mp3',
    '../static/audio/sounds/Clavier-d-ordinateur.mp3',
    '../static/audio/sounds/Miaulement-de-chat.mp3'
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




