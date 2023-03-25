// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function playVideo(divWrappingVideo, currentPlaying) {
    divWrappingVideo.firstElementChild.muted = true;
    setTimeout(() => {
        divWrappingVideo.firstElementChild.play();
    }, 1000);
}

function stopVideo(divWrappingVideo, currentPlaying) {
    divWrappingVideo.firstElementChild.pause();
    divWrappingVideo.firstElementChild.load();
}

function deactivateCurrentElement(divWrapping, currentPlaying){
    divWrapping.classList.remove('active');
    if(divWrapping.querySelectorAll('img').length === 0){
        stopVideo(divWrapping, currentPlaying);
    }
}

function activateNextElement(divWrapping, currentPlaying){
    divWrapping.classList.add('active');
    if(divWrapping.querySelectorAll('img').length === 0){
        playVideo(divWrapping, currentPlaying);
    }
}

function startCarousel(sequence) {
    let currentPlaying = 0;
    const switchTimeout = 10000;
    sequence.classList.add('idle');
    playVideo(sequence.children[currentPlaying]);
    setInterval(() => {
        deactivateCurrentElement(sequence.children[currentPlaying], currentPlaying);
        currentPlaying += 1;
        if(currentPlaying === sequence.childElementCount){
            currentPlaying = 0;
        }
        activateNextElement(sequence.children[currentPlaying]);
    }, switchTimeout);
}

const carousels = document.querySelectorAll('.sequence');
carousels.forEach(startCarousel);