// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function playVideo(divWrappingVideo, currentPlaying) {
    divWrappingVideo.classList.add('active');
    divWrappingVideo.firstElementChild.muted = true;
    setTimeout(() => {
        divWrappingVideo.firstElementChild.play();
    }, 1000);
}

function stopVideo(divWrappingVideo, currentPlaying) {
    divWrappingVideo.firstElementChild.pause();
    divWrappingVideo.classList.remove('active');
    divWrappingVideo.firstElementChild.load();
}

function startCarousel(sequence) {
    let currentPlaying = 0;
    const switchTimeout = 10000;
    sequence.classList.add('idle');
    playVideo(sequence.children[currentPlaying]);
    setInterval(() => {
        stopVideo(sequence.children[currentPlaying], currentPlaying);
        currentPlaying+=1;
        if(currentPlaying === sequence.childElementCount){
        currentPlaying = 0;
        }
        playVideo(sequence.children[currentPlaying]);
    }, switchTimeout);
}

const carousels = document.querySelectorAll('.sequence');
carousels.forEach(startCarousel);