const btnContainer = document.querySelector('.btn-container');
const btn = document.querySelectorAll('.btn');
const piano = document.querySelector('.piano');
const pianoKey = document.querySelectorAll('.piano-key');
const fullscreen = document.querySelector('.fullscreen');

const startSound = (event) => {
    playAudio(event.target.dataset.note);
    event.target.classList.add('piano-key-active');
    event.target.classList.add('piano-key-active-pseudo');
}
const stopSound = (event) => {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
}

function playAudio(note) {
    const audio = new Audio();
    audio.src = `assets/audio/${note}.mp3`;
    audio.currentTime = 0;
    audio.play();
}

btnContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        btn.forEach((el) => {
            if (el.classList.contains('btn-active')) {
                el.classList.remove('btn-active');
            }
        });
        event.target.classList.add('btn-active');
    }
    if (event.target.classList.contains('btn-letters')) {
        pianoKey.forEach((el) => {
            el.classList.add("letter");
        })
    } else {
        pianoKey.forEach((el) => {
            el.classList.remove("letter");

        })
    }
});

piano.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('piano-key')) {
        playAudio(event.target.dataset.note);
        event.target.classList.add('piano-key-active');
        event.target.classList.add('piano-key-active-pseudo');
        pianoKey.forEach((el) => {
            el.addEventListener('mouseover', startSound);
            el.addEventListener('mouseout', stopSound);
        });

    }
});
document.addEventListener('mouseup', (event) => {
    pianoKey.forEach((el) => {
        event.target.classList.remove('piano-key-active');
        event.target.classList.remove('piano-key-active-pseudo');
        el.removeEventListener('mouseover', startSound);
        el.removeEventListener('mouseout', stopSound);
    });

});

document.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    pianoKey.forEach((el) => {
        if ("Key" + el.dataset.letter == event.code) {
            el.classList.add('piano-key-active');
            playAudio(el.dataset.note);
        }
    });

});
document.addEventListener('keyup', (event) => {
    pianoKey.forEach((el) => {
        if ("Key" + el.dataset.letter == event.code) {
            el.classList.remove('piano-key-active');
        }
    });
});

fullscreen.addEventListener('click', (event) => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    document.documentElement.requestFullscreen();
})