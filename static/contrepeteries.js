const contrepeteries = [
    { original: "Sacré champ de coton !", contrepeterie: "Sacré temps de cochon !" },
    { original: "C'est une gamelle de morilles.", contrepeterie: "C’est une mamelle de gorille." },
    { original: "Il faut laisser le pain chaud.", contrepeterie: "Il faut lécher le pinceau." },
    { original: "La Banque Postale.", contrepeterie: "La Poste bancale." },
    { original: "Un mot vache.", contrepeterie: "Un veau moche." },
    { original: "La petite maison dans la prairie.", contrepeterie: "La petite prison dans la mairie." },
    { original: "Il a loupé son car !", contrepeterie: "Il a coupé son lard !" },
    { original: "Il y a une tâche sur la voiture.", contrepeterie: "Il y a une vache sur la toiture." },
    { original: "Il y a un coteau près du pont.", contrepeterie: "Il y a un poteau près du con." },
    { original: "La cuvette est pleine de bouille.", contrepeterie: "La buvette est pleine de couillons." },
    { original: "Attention le pont va casser !", contrepeterie: "Attention, le c*n va passer !" },
    { original: "Partir, c'est mourir un peu.", contrepeterie: "Martyr, c’est pourrir un peu." },
    { original: "Le bras sur la chaise.", contrepeterie: "Le chat sur la braise." },
    { original: "L'outrage du vent.", contrepeterie: "L’ouvrage du temps." },
    { original: "La contrepèterie, c'est l'art de décaler les sons.", contrepeterie: "La contrepèterie, c’est l’art de dessaler les cons." },
    { original: "Des voyelles en otage.", contrepeterie: "Des voyages en hôtel." },
    { original: "Grand-père, vous avez de la mousse à la pistache.", contrepeterie: "Grand-père, vous avez de la pisse dans la moustache." },
    { original: "C'est long comme lacune.", contrepeterie: "C’est con comme la lune." },
    { original: "Gary part de Lyon", contrepeterie: "Paris Gare de Lyon" },
    { original: "La Banque Postale", contrepeterie: "La Poste Bancale" },
    { original: "Un lien vaut mieux que deux tutorats", contrepeterie: "Un tiens vaut mieux que deux l'auras" },
    { original: "J'ai hâte d'être à l'opéra", contrepeterie: "J'ai hâte d'être à l'apéro" }
];

let shuffledContrepeteries = shuffleArray([...contrepeteries]);
let currentPhraseIndex = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function nextPhrase() {
    if (currentPhraseIndex >= shuffledContrepeteries.length) {
        currentPhraseIndex = 0;
        shuffledContrepeteries = shuffleArray([...contrepeteries]);
    }

    const originalPhrase = document.getElementById('original-phrase');
    const contrepeteriePhrase = document.getElementById('counterpeterie-phrase');

    originalPhrase.textContent = shuffledContrepeteries[currentPhraseIndex].original;
    contrepeteriePhrase.textContent = shuffledContrepeteries[currentPhraseIndex].contrepeterie;
    currentPhraseIndex++;
}



document.addEventListener('DOMContentLoaded', () => {
    nextPhrase();
});
