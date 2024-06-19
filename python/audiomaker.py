import os

# Liste de mots pour lesquels générer des fichiers audio
words = ["Zigouigoui", "Bric-à-brac", "Farfelu", "Tintamarre", "Quiproquo", 
         "Tralalère", "Gribouille", "Zonzon", "Brouhaha", "Chichiteux"]

# Chemin du dossier où les fichiers audio seront enregistrés
output_dir = "./words/"

# Créer le dossier de sortie s'il n'existe pas
os.makedirs(output_dir, exist_ok=True)

# Générer un fichier audio pour chaque mot
for word in words:
    output_file = os.path.join(output_dir, f"{word}.m4a")
    command = f'say -o "{output_file}" --data-format=aac "{word}"'
    os.system(command)

print("Les fichiers audio ont été générés avec succès.")
