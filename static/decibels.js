let audioContext;
let meter;
let targetDecibelValue;
let startTime;
let timerInterval;

// Paramètres pour les décibels tirables et les limites de la jauge
const minTirableDecibels = 1;
const maxTirableDecibels = 25;
const minGaugeDecibels = -10;
const maxGaugeDecibels = 30;

const totalDuration = 5; // 5 secondes

function modifyDecibels(currentDecibel){
    return 0.4 * (50 + currentDecibel);
}

function startGame() {
    // Afficher les canvas après le début du jeu
    const timerCanvas = document.getElementById('timerCanvas');
    const gaugeCanvas = document.getElementById('gaugeCanvas');
    if (timerCanvas) {
        gaugeCanvas.style.display = 'block';
        timerCanvas.style.display = 'block';
    }

    document.getElementById('result').textContent = '';


    targetDecibelValue = Math.floor(Math.random() * (maxTirableDecibels - minTirableDecibels + 1)) + minTirableDecibels; // Cible entre minTirableDecibels et maxTirableDecibels

    // Initialiser l'audio context et analyser le son
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    meter = createAudioMeter(audioContext);

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioContext.createMediaStreamSource(stream).connect(meter);
            startMonitoring();
        })
        .catch(error => {
            console.error('Erreur lors de l\'accès au microphone :', error);
        });
}

function startMonitoring() {
    startTime = Date.now();
    const gaugeCtx = document.getElementById('gaugeCanvas').getContext('2d');
    const timerCtx = document.getElementById('timerCanvas').getContext('2d');
    timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000;
        const remainingTime = Math.max(totalDuration - elapsedTime, 0);

        drawTimer(timerCtx, remainingTime / totalDuration);

        const currentVolume = meter.volume;
        const currentDecibel = currentVolume > 0 ? 20 * Math.log10(currentVolume) : minGaugeDecibels; // Ajustez le calcul pour des valeurs positives
        const modifiedCurrentDecibel = modifyDecibels(currentDecibel);
        drawGauge(gaugeCtx, modifiedCurrentDecibel);

        if (elapsedTime > totalDuration) {
            clearInterval(timerInterval);
            const finalModifiedCurrentDecibel = modifiedCurrentDecibel;
            drawGauge(gaugeCtx, finalModifiedCurrentDecibel, true);
            if (Math.abs(finalModifiedCurrentDecibel - targetDecibelValue) <= 2) {
                document.getElementById('result').textContent = 'Bien joué ! Vous marquez 1 point.';
                
            } else {
                document.getElementById('result').textContent = 'Dommage, essayez encore si les autres joueurs sont ok !';
            }
            document.getElementById('cta').textContent = 'Rejouer';
            return;
        }
    }, 100);
}

function drawGauge(ctx, modifiedCurrentDecibel, final = false) {
    const image = new Image();
    image.src = '../static/images/target.png';
    const gaugeHeight = 500;
    const gaugeWidth = 50;
    image.onload = function() {
        ctx.clearRect(0, 0, gaugeWidth + 100, gaugeHeight + 100);

        // Dessiner la jauge
        ctx.fillStyle = '#003E55';
        ctx.fillRect(10, 50, gaugeWidth, gaugeHeight);

        // Dessiner les marques de graduation
        drawGraduationMarks(ctx, gaugeHeight, gaugeWidth);

        // Dessiner la cible sans déformation
        const targetPositionY = 50 + gaugeHeight - ((targetDecibelValue - minGaugeDecibels) / (maxGaugeDecibels - minGaugeDecibels) * gaugeHeight);
        const targetSize = gaugeWidth;
        ctx.drawImage(image, 10, targetPositionY - targetSize / 2, targetSize, targetSize);

        // Dessiner l'indicateur de décibels
        const currentPositionY = 50 + gaugeHeight - ((Math.max(minGaugeDecibels + 5, Math.min(maxGaugeDecibels, modifiedCurrentDecibel)) - minGaugeDecibels) / (maxGaugeDecibels - minGaugeDecibels) * gaugeHeight);
        ctx.beginPath();
        ctx.moveTo(10 + gaugeWidth, currentPositionY);
        ctx.lineTo(10 + gaugeWidth + 40, currentPositionY - 20);
        ctx.lineTo(10 + gaugeWidth + 40, currentPositionY + 20);
        ctx.closePath();
        ctx.fillStyle = final ? '#008BFF' : '#00BF9C';
        ctx.fill();
    };
}

function drawGraduationMarks(ctx, gaugeHeight, gaugeWidth) {
    const graduation = 5;
    const numberOfMarks = (maxGaugeDecibels - minGaugeDecibels) / graduation;
    for (let i = 0; i <= numberOfMarks; i++) {
        const y = 50 + gaugeHeight - (i * graduation / (maxGaugeDecibels - minGaugeDecibels) * gaugeHeight);
        ctx.beginPath();
        ctx.moveTo(10, y);
        ctx.lineTo(10 + gaugeWidth, y);
        ctx.setLineDash([5, 5]); // Pointillés
        ctx.strokeStyle = '#FFF';
        ctx.stroke();
    }
    ctx.setLineDash([]); // Réinitialiser les pointillés
}

function drawTimer(ctx, percentage) {
    const radius = 30; // Taille plus petite du cercle timer
    const maxRadius = 35;
    const startAngle = -0.5 * Math.PI;
    const endAngle = (2 * Math.PI * percentage) - 0.5 * Math.PI;

    ctx.clearRect(0, 0, 75, 75);

    // Fond du cercle en rose
    ctx.beginPath();
    ctx.arc(maxRadius, maxRadius, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffb6c1'; // Couleur de fond rose
    ctx.fill();

    // Bord du cercle en gris
    ctx.beginPath();
    ctx.arc(maxRadius, maxRadius, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Cercle de progression
    ctx.beginPath();
    ctx.arc(maxRadius, maxRadius, radius, startAngle, endAngle);
    ctx.strokeStyle = '#00BF9C';
    ctx.lineWidth = 10;
    ctx.stroke();
}

function createAudioMeter(audioContext, clipLevel = 0.98, averaging = 0.95, clipLag = 750) {
    const processor = audioContext.createScriptProcessor(512);
    processor.onaudioprocess = (event) => {
        const buf = event.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
            const x = buf[i];
            sum += x * x;
        }
        const rms = Math.sqrt(sum / buf.length);
        processor.volume = rms;
    };
    processor.volume = 0;
    processor.connect(audioContext.destination);
    return processor;
}
