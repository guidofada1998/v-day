const gifStages = [
    "https://media1.tenor.com/m/k4_upC5Q3jkAAAAd/cute-cat.gif",    // 0 inicial (pareja)
    "https://media1.tenor.com/m/dL4tSN1Kj0oAAAAd/john-cena-what.gif",  // 1 confused
    "https://media1.tenor.com/m/_G-AtuudnzAAAAAd/spongebob-sad.gif",   // 2 pleading
    "https://media1.tenor.com/m/yfMxg16a0CUAAAAd/wojak-rain-wojak.gif",// 3 sad
    "https://media1.tenor.com/m/4ZcIoSsLr00AAAAd/panda-lonely.gif",    // 4 sadder
    "https://media.tenor.com/ptbPaU0bAr8AAAAi/why-but-why.gif",        // 5 devastated
    "https://media1.tenor.com/m/_G-AtuudnzAAAAAd/spongebob-sad.gif",   // 6 very devastated
    "https://media.tenor.com/ptbPaU0bAr8AAAAi/why-but-why.gif"         // 7 crying runaway
];

const noMessages = [
    "No",
    "Segurita? 🤔",
    "Mi trencito chuchu... 🥺",
    "Po fa vo... 🥺🥺",
    "Me voa pone to triste... 😢",
    "Porfaaa dí que sii ándalee 💔",
    "No me hagas esto, pensá en Isabella... 😢",
    "es que ia no me amas? Última oportunidad 🥺",
    "Dale alcanzame gay"
];

const yesTeasePokes = [
    "Decí que no gay",
    "Dale no seas pt",
    "Me querés arruinar la sorpresa, yo te conozco",
    "Pone que no o te secuestro a Popo.. digo Pipo.",
    "Decí que sos linda...",
    "Cuando vos fuiste, yo ya fui y vine como 20 veces..",
    "A partir de ahora sólo voy a decir que te comportes como una señorita",
    "Comportate como una señorita por favor"
];

let yesTeasedCount = 0;
let noClickCount = 0;
let runawayEnabled = false;
let musicPlaying = true;

const catGif = document.getElementById('cat-gif');
const catGif2 = document.getElementById('cat-gif-2'); // Segundo GIF
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const music = document.getElementById('bg-music');

// --- Lógica de Música ---
music.muted = true;
music.volume = 0.3;
music.play().then(() => {
    music.muted = false;
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false;
        music.play().catch(() => {});
    }, { once: true });
});

function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        document.getElementById('music-toggle').textContent = '🔇';
    } else {
        music.muted = false;
        music.play();
        musicPlaying = true;
        document.getElementById('music-toggle').textContent = '🔊';
    }
}

// --- Manejo del botón SÍ ---
function handleYesClick() {
    // Si todavía no se activó el "escape" del botón No, la molestamos un poco
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)];
        yesTeasedCount++;
        showTeaseMessage(msg);
        return;
    }
    window.location.href = 'yes.html';
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// --- Manejo del botón NO ---
function handleNoClick() {
    noClickCount++;

    // 1. Cambiar texto del botón No
    const msgIndex = Math.min(noClickCount, noMessages.length - 1);
    noBtn.textContent = noMessages[msgIndex];

    // 2. Agrandar botón Sí proporcionalmente
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.35}px`;
    const padY = Math.min(18 + noClickCount * 5, 60);
    const padX = Math.min(45 + noClickCount * 10, 120);
    yesBtn.style.padding = `${padY}px ${padX}px`;

    // 3. Achicar botón No después del segundo clic
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`;
    }

    // 4. Cambiar GIF y ELIMINAR el segundo
    const gifIndex = Math.min(noClickCount, gifStages.length -
