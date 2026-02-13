const gifStages = [
    "https://media1.tenor.com/m/k4_upC5Q3jkAAAAd/cute-cat.gif",
    "https://media1.tenor.com/m/dL4tSN1Kj0oAAAAd/john-cena-what.gif",
    "https://media1.tenor.com/m/_G-AtuudnzAAAAAd/spongebob-sad.gif",
    "https://media1.tenor.com/m/yfMxg16a0CUAAAAd/wojak-rain-wojak.gif",
    "https://media1.tenor.com/m/4ZcIoSsLr00AAAAd/panda-lonely.gif",
    "https://media.tenor.com/ptbPaU0bAr8AAAAi/why-but-why.gif",
    "https://media1.tenor.com/m/_G-AtuudnzAAAAAd/spongebob-sad.gif",
    "https://media.tenor.com/ptbPaU0bAr8AAAAi/why-but-why.gif"
];

const noMessages = [
    "No", "Segurita? 🤔", "Mi trencito chuchu... 🥺", "Po fa vo... 🥺🥺",
    "Me voa pone to triste... 😢", "Porfaaa dí que sii ándalee 💔",
    "No me hagas esto, pensá en Isabella... 😢",
    "es que ia no me amas? Última oportunidad 🥺", "Dale alcanzame gay"
];

const yesTeasePokes = [
    "Decí que no gay", "Dale no seas pt", "Me querés arruinar la sorpresa, yo te conozco",
    "Pone que no o te secuestro a Popo.. digo Pipo.", "Decí que sos linda...",
    "Cuando vos fuiste, yo ya fui y vine como 20 veces..",
    "A partir de ahora sólo voy a decir que te comportes como una señorita",
    "Comportate como una señorita por favor"
];

let yesTeasedCount = 0;
let noClickCount = 0;
let runawayEnabled = false;
let musicPlaying = true;

// Referencias seguras
const catGif = document.getElementById('cat-gif');
const catGif2 = document.getElementById('cat-gif-2');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const music = document.getElementById('bg-music');

// --- ASIGNACIÓN MANUAL DE EVENTOS (Para asegurar que funcionen) ---
if (yesBtn) yesBtn.onclick = handleYesClick;
if (noBtn) noBtn.onclick = handleNoClick;

// --- Música ---
if (music) {
    music.muted = true;
    music.volume = 0.3;
    music.play().then(() => { music.muted = false; }).catch(() => {
        document.addEventListener('click', () => {
            music.muted = false;
            music.play().catch(() => {});
        }, { once: true });
    });
}

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)];
        yesTeasedCount++;
        showTeaseMessage(msg);
        return;
    }
    window.location.href = 'yes.html';
}

function handleNoClick() {
    noClickCount++;
    const msgIndex = Math.min(noClickCount, noMessages.length - 1);
    if (noBtn) noBtn.textContent = noMessages[msgIndex];

    if (yesBtn) {
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = `${currentSize * 1.35}px`;
        const padY = Math.min(18 + noClickCount * 5, 60);
        const padX = Math.min(45 + noClickCount * 10, 120);
        yesBtn.style.padding = `${padY}px ${padX}px`;
    }

    if (noClickCount >= 2 && noBtn) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`;
    }

    swapGif(gifStages[Math.min(noClickCount, gifStages.length - 1)]);

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway();
        runawayEnabled = true;
    }
}

function swapGif(src) {
    if (catGif) catGif.style.opacity = '0';
    if (catGif2) catGif2.style.opacity = '0';
    
    setTimeout(() => {
        if (catGif) {
            catGif.src = src;
            catGif.style.opacity = '1';
        }
        // Desaparece el segundo gif al primer clic
        if (catGif2) {
            if (noClickCount > 0) {
                catGif2.style.display = 'none';
            } else {
                catGif2.style.opacity = '1';
            }
        }
    }, 200);
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function enableRunaway() {
    if (noBtn) {
        noBtn.addEventListener('mouseover', runAway);
        noBtn.addEventListener('touchstart', runAway, { passive: true });
    }
}

function runAway() {
    const margin = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - margin;
    const maxY = window.innerHeight - noBtn.offsetHeight - margin;
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${Math.random() * maxX + margin / 2}px`;
    noBtn.style.top = `${Math.random() * maxY + margin / 2}px`;
    noBtn.style.zIndex = '50';
}
