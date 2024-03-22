from flask import Flask, render_template, jsonify
import os
import random

app = Flask(__name__)

# Directory containing audio files
AUDIO_FILES_DIR = os.path.join(app.static_folder, 'audio')
audio_files = [f for f in os.listdir(AUDIO_FILES_DIR) if f.endswith('.mp3')]

@app.route('/')
def index():
    # Select a random audio file to display initially
    selected_audio = random.choice(audio_files)
    return render_template('index.html', audio_file=selected_audio)

@app.route('/random-audio')
def random_audio():
    # API to get a random audio file
    selected_audio = random.choice(audio_files)
    return jsonify({'audio_file': selected_audio})

if __name__ == '__main__':
    app.run(debug=True)
