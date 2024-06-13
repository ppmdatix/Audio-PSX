let questions = [
    { question: "Les appareils auditifs peuvent-ils améliorer la compréhension de la parole ?", answer: "oui", explanation: "Oui, les appareils auditifs peuvent grandement améliorer la compréhension de la parole en amplifiant les sons." },
    { question: "Les acouphènes sont-ils toujours causés par une perte auditive ?", answer: "non", explanation: "Non, les acouphènes peuvent être causés par divers facteurs, pas seulement par une perte auditive." },
    { question: "Peut-on nager avec des appareils auditifs ?", answer: "non", explanation: "Non, la plupart des appareils auditifs ne sont pas étanches et ne doivent pas être portés en nageant." },
    { question: "Les tests auditifs doivent-ils être effectués uniquement par des audioprothésistes ?", answer: "non", explanation: "Non, les tests auditifs peuvent également être effectués par des audiologistes et des médecins ORL." },
    { question: "Les jeunes peuvent-ils aussi porter des appareils auditifs ?", answer: "oui", explanation: "Oui, les appareils auditifs sont adaptés à tous les âges, y compris les jeunes enfants." },
    { question: "La perte auditive liée à l'âge est appelée presbyacousie ?", answer: "oui", explanation: "Oui, la perte auditive liée à l'âge est appelée presbyacousie." },
    { question: "Les appareils auditifs peuvent-ils corriger complètement une surdité totale ?", answer: "non", explanation: "Non, les appareils auditifs ne peuvent pas corriger une surdité totale mais peuvent aider dans de nombreux cas de perte auditive partielle." },
    { question: "Les bouchons d'oreilles peuvent-ils protéger contre la perte auditive due au bruit ?", answer: "oui", explanation: "Oui, les bouchons d'oreilles peuvent aider à protéger l'audition contre les dommages causés par des niveaux sonores élevés." },
    { question: "Les implants cochléaires sont une option pour certaines personnes atteintes de surdité sévère ?", answer: "oui", explanation: "Oui, les implants cochléaires peuvent être une solution pour les personnes atteintes de surdité sévère ou profonde." },
    { question: "Les appareils auditifs nécessitent une maintenance régulière ?", answer: "oui", explanation: "Oui, les appareils auditifs nécessitent une maintenance régulière pour fonctionner correctement." },
    { question: "Les aides auditives peuvent-elles se connecter à des smartphones ?", answer: "oui", explanation: "Oui, de nombreuses aides auditives modernes peuvent se connecter à des smartphones via Bluetooth." },
    { question: "Il n'existe qu'un seul type d'appareil auditif ?", answer: "non", explanation: "Non, il existe plusieurs types d'appareils auditifs, y compris ceux qui se portent derrière l'oreille et ceux qui se placent à l'intérieur du conduit auditif." },
    { question: "L'acouphène est une maladie ?", answer: "non", explanation: "Non, l'acouphène n'est pas une maladie en soi mais un symptôme pouvant être associé à diverses conditions." },
    { question: "Les appareils auditifs numériques peuvent ajuster automatiquement les niveaux de son ?", answer: "oui", explanation: "Oui, les appareils auditifs numériques peuvent ajuster automatiquement les niveaux de son pour offrir une meilleure expérience auditive." },
    { question: "Le cérumen peut affecter les performances des appareils auditifs ?", answer: "oui", explanation: "Oui, l'accumulation de cérumen peut obstruer les appareils auditifs et réduire leur efficacité." },
    { question: "Les batteries des appareils auditifs doivent être changées tous les jours ?", answer: "non", explanation: "Non, la durée de vie des batteries des appareils auditifs varie mais elles ne doivent généralement pas être changées tous les jours." },
    { question: "Les personnes atteintes de surdité peuvent lire sur les lèvres ?", answer: "oui", explanation: "Oui, de nombreuses personnes atteintes de surdité développent la capacité de lire sur les lèvres pour mieux comprendre la parole." },
    { question: "Les infections de l'oreille ne peuvent pas causer de perte auditive ?", answer: "non", explanation: "Non, les infections de l'oreille peuvent entraîner une perte auditive temporaire ou permanente." },
    { question: "Les appareils auditifs peuvent réduire les acouphènes ?", answer: "oui", explanation: "Oui, certains appareils auditifs peuvent aider à réduire les acouphènes en amplifiant les sons extérieurs." },
    { question: "Le bruit blanc peut aider à masquer les acouphènes ?", answer: "oui", explanation: "Oui, le bruit blanc peut aider à masquer les acouphènes et à réduire leur perception." }
];

let score = 0;
let questionsAsked = 0;
let currentQuestionIndex = 0;
let usedQuestions = [];
let rulesHidden = false;

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function hideRules() {
    if (!rulesHidden) {
        const rulesContainer = document.querySelector('.game-rules-container');
        if (rulesContainer) {
            rulesContainer.style.display = 'none';
        }
        rulesHidden = true;
    }
}

function loadQuestion() {
    if (questionsAsked < 5) {
        currentQuestionIndex = usedQuestions[questionsAsked];
        const question = questions[currentQuestionIndex].question;
        const questionContainer = document.getElementById('question');
        questionContainer.innerHTML = `
            <div class="question">${question}</div>
            <div class="answer-buttons">
                <button onclick="checkAnswer('oui')">Oui</button>
                <button onclick="checkAnswer('non')">Non</button>
            </div>
        `;
    } else {
        const result = score >= 3 ? `Vous avez gagné 2 points!` : `Vous avez perdu!`;
        document.getElementById('question').innerHTML = `
            <div class="question">Le quiz est terminé. ${result}</div>
            <div class="score">Score: ${score}/5 bonnes réponses</div>
        `;
    }
}

function checkAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const explanation = questions[currentQuestionIndex].explanation;
    const questionContainer = document.getElementById('question');
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
    }
    questionsAsked++;
    hideRules();
    questionContainer.innerHTML = `
        <div class="question">${questions[currentQuestionIndex].question}</div>
        <div class="answer">Réponse: ${correctAnswer}</div>
        <div class="explanation">${explanation}</div>
        </br>
        <div class="score">Score actuel: ${score}/${questionsAsked}</div>
        <button class="next-question-btn" onclick="loadQuestion()">➡️ Question suivante ⬅️</button>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    shuffleQuestions(questions);
    usedQuestions = questions.slice(0, 5).map((_, index) => index);
    loadQuestion();
});
