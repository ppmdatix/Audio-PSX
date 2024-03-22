document.getElementById('reload-button').addEventListener('click', function() {
    fetch('/random-audio')
        .then(response => response.json())
        .then(data => {
            const audioPlayer = document.getElementById('myAudio');
            const newSrc = `${window.location.origin}/static/audio/${data.audio_file}`;
            audioPlayer.src = newSrc;
            audioPlayer.load();  // Reloads new audio
            audioPlayer.pause();  // Ensure audio is not playing

            // Reset Play/Pause Button
            const playPauseBtn = document.getElementById('playPauseBtn');
            playPauseBtn.textContent = '🎶 Jouer le son 🎶';

            // Reset Reveal Button
            const revealButton = document.getElementById('reveal-name-button');
            revealButton.style.display = 'block';  // Show "Reveal Name" button again
            revealButton.textContent = '❗ Révéler ❗';
        });
});

document.getElementById('reveal-name-button').addEventListener('click', function() {
    console.log("Reveal button clicked");  // Debugging log
    const audioPlayer = document.getElementById('myAudio');
    const filePath = audioPlayer.currentSrc;  // Use currentSrc instead of src
    console.log("Current File path:", filePath);  // Debugging log
    const fileName = decodeURIComponent(filePath.split('/').pop().split('.').slice(0, -1).join('.'));
    console.log("Decoded file name:", fileName);  // Debugging log
    this.textContent = fileName;  // Update the button text with the file name
});

document.addEventListener('DOMContentLoaded', (event) => {
    var myAudio = document.getElementById('myAudio');
    var playPauseBtn = document.getElementById('playPauseBtn');

    playPauseBtn.addEventListener('click', function() {
        if (myAudio.paused) {
            myAudio.play();
            this.textContent = '⏸️ Arrêter le son ⏸️';
        } else {
            myAudio.pause();
            this.textContent = '🎶 Jouer le son 🎶';
        }
    });
});
