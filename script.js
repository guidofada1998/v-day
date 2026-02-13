// ... (Tus listas gifStages, noMessages y yesTeasePokes se mantienen igual)

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const catGif2 = document.getElementById('cat-gif-2') // El segundo gatito
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// --- Lógica de Música (Igual) ---
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause(); musicPlaying = false;
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false; music.play(); musicPlaying = true;
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

// --- Lógica de Clics ---
function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cambiar mensaje del botón No
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Aumentar botón Sí
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Achicar botón No
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Cambiar GIF
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Activar escape del botón
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

// --- ESTA ES LA FUNCIÓN QUE CORREGÍ ---
function swapGif(src) {
    // Desvanecemos ambos
    catGif.style.opacity = '0'
    if (catGif2) catGif2.style.opacity = '0'
    
    setTimeout(() => {
        // El primer GIF siempre cambia
        catGif.src = src
        catGif.style.opacity = '1'
        
        // El segundo GIF se ELIMINA después del primer clic
        if (catGif2) {
            if (noClickCount > 0) {
                catGif2.style.display = 'none' // Desaparece del espacio
            } else {
                catGif2.src = src
                catGif2.style.opacity = '1'
            }
        }
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
