document.getElementById('reload-button').addEventListener('click', function() {
    // Retrieve the folder from the data attribute
    const folder = this.getAttribute('data-audio-folder'); 
    fetch(`/random-${folder}`)  // This will now fetch from /random-las or /random-sounds depending on the folder set
        .then(response => response.json())
        .then(data => {
            const audioPlayer = document.getElementById('myAudio');
            // Use the folder variable to construct the new source path
            const newSrc = `${window.location.origin}/static/audio/${folder}/${data.audio_file}`;
            audioPlayer.src = newSrc; // Change the source
            audioPlayer.pause();
            audioPlayer.load(); // Reloads new audio
            const playPauseBtn = document.getElementById('playPauseBtn');
            playPauseBtn.textContent = folder === 'las' ? '🎶 Jouer les la 🎶' : '🎶 Jouer le son 🎶'; // Update text based on folder
            const revealButton = document.getElementById('reveal-name-button');
            revealButton.style.display = 'block'; // Show "Reveal Name" button again
            revealButton.textContent = '❗ Révéler ❗'; // Reset text for the reveal button
        }).catch(error => console.error('Error loading new sound:', error));
});






// Common function to handle playing and pausing
function togglePlayPause(audioPlayer, buttonText) {
    if (audioPlayer.paused) {
        audioPlayer.play();
        buttonText.textContent = '⏸️ Arrêter le son ⏸️'; // Adjust text as needed
    } else {
        audioPlayer.pause();
        buttonText.textContent = '🎶 Jouer le son 🎶'; // Adjust text based on your context
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('myAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const reloadBtn = document.getElementById('reload-button');
    const revealBtn = document.getElementById('reveal-name-button');
    const folder = reloadBtn.getAttribute('data-audio-folder'); 
    const fetched = folder === 'las' ? 'random-la' : 'random-sound'; // Update text based on folder
    const texteAJouer = folder === 'las' ? 'la' : 'son';



    // Toggle play/pause functionality
    playPauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            this.textContent = '⏸️ Arrêter le ' + texteAJouer;
        } else {
            audioPlayer.pause();
            this.textContent = '🎶 Jouer le ' + texteAJouer + ' 🎶';
        }
    });

    // Change button text when audio ends
    audioPlayer.addEventListener('ended', function() {
        playPauseBtn.textContent = '🎶 Jouer le ' + texteAJouer + ' 🎶';
    });

    

    // Reload new audio file
    reloadBtn.addEventListener('click', function() {
        fetch(fetched)
            .then(response => response.json())
            .then(data => {
                audioPlayer.src = `${window.location.origin}/static/audio/${folder}/${data.audio_file}`;
                audioPlayer.pause();
                audioPlayer.load(); // Necessary to load the new source
                playPauseBtn.textContent = '🎶 Jouer le ' + texteAJouer + ' 🎶'; // Reset play/pause button text
                revealBtn.textContent = '❗Révéler ❗'; // Reset reveal button text
            }).catch(error => console.error('Error loading new sound:', error));
    });

    // Reveal sound name
    revealBtn.addEventListener('click', function() {
        const fileName = decodeURIComponent(audioPlayer.currentSrc.split('/').pop().split('.').slice(0, -1).join('.'));
        this.textContent = fileName; // Update the button text with the file name
    });
});
