// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function startCarousel(sequence) {
    const currentPlaying = 0;
    const switchTimeout = 5000;
    sequence[currentPlaying].classList.add('active');
    setInterval(() => {
        sequence[currentPlaying].classList.remove('active');
        index++;
        if(index === sequence.length){
        index = 0;
        }
        sequence[currentPlaying].classList.add('active');
    }, switchTimeout);
}

const carousels = document.querySelectorAll('sequence');
carousels.forEach(startCarousel);