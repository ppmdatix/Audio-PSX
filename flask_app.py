from flask import Flask, render_template, jsonify
import os
import random

app = Flask(__name__)

# Directory containing audio files
SOUND_FILES_DIR = os.path.join(app.static_folder, 'audio/sounds')
LA_FILES_DIR = os.path.join(app.static_folder, 'audio/las')
sound_files = [f for f in os.listdir(SOUND_FILES_DIR) if f.endswith('.mp3')]
la_files    = [f for f in os.listdir(LA_FILES_DIR) if f.endswith('.mp3')]


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/random_sound_player')
def random_sound_player():
    # Select a random audio file to display initially
    selected_sound = random.choice(sound_files)
    return render_template('random_sound_player.html', audio_file=selected_sound)


@app.route('/la_counter')
def la_counter():
    # Select a random audio file to display initially
    selected_audio = random.choice(audio_files)
    return render_template('la_counter.html', audio_file=selected_audio)


@app.route('/random-sound')
def random_sound():
    # API to get a random audio file
    selected_sound = random.choice(sound_files)
    return jsonify({'audio_file': selected_sound})


@app.route('/random-la')
def random_la():
    # API to get a random audio file
    selected_la = random.choice(audio_files)
    return jsonify({'audio_file': selected_la})

if __name__ == '__main__':
    app.run(debug=True)
