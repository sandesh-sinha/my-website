// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function startCarousel(sequence) {
    let currentPlaying = 0;
    const switchTimeout = 5000;
    sequence.children[currentPlaying].classList.add('active');
    setInterval(() => {
        sequence.children[currentPlaying].classList.remove('active');
        currentPlaying+=1;
        if(currentPlaying === sequence.length){
        currentPlaying = 0;
        }
        sequence.children[currentPlaying].classList.add('active');
    }, switchTimeout);
}

const carousels = document.querySelectorAll('.sequence');
carousels.forEach(startCarousel);