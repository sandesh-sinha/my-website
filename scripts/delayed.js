// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function playVideo(divWrappingVideo, currentPlaying) {
    divWrappingVideo.classList.add('active');
    divWrappingVideo.firstElementChild.muted = true;
    divWrappingVideo.firstElementChild.play();
}

function startCarousel(sequence) {
    let currentPlaying = 0;
    const switchTimeout = 5000;
    sequence.classList.add('idle');
    playVideo(sequence.children[currentPlaying]);
    setInterval(() => {
        sequence.children[currentPlaying].firstElementChild.pause();
        sequence.children[currentPlaying].classList.remove('active');
        currentPlaying+=1;
        if(currentPlaying === sequence.childElementCount){
        currentPlaying = 0;
        }
        playVideo(sequence.children[currentPlaying]);
    }, switchTimeout);
}

const carousels = document.querySelectorAll('.sequence');
carousels.forEach(startCarousel);