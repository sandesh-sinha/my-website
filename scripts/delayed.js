// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function playVideo(divWrappingVideo) {
    divWrappingVideo.firstElementChild.muted = true;
    setTimeout(() => {
        divWrappingVideo.firstElementChild.play();
    }, 1000);
}

function stopVideo(divWrappingVideo) {
    divWrappingVideo.firstElementChild.pause();
    divWrappingVideo.firstElementChild.load();
}

function deactivateCurrentElement(divWrapping){
    if(divWrapping.classList.contains('active')) {
        divWrapping.classList.remove('active');
    }
    if(divWrapping.querySelectorAll('img').length === 0){
        stopVideo(divWrapping);
    }
}

function activateNextElement(divWrapping){
    if(divWrapping.classList.contains('active')) divWrapping.classList.add('active');
    if(divWrapping.querySelectorAll('img').length === 0){
        playVideo(divWrapping);
    }
}

let carouselInterval;

function startCarousel(sequence) {
    let currentPlaying = 0;
    const switchTimeout = 10000;
    sequence.classList.add('idle');
    playVideo(sequence.children[currentPlaying]);
    carouselInterval = setInterval(() => {
        deactivateCurrentElement(sequence.children[currentPlaying], currentPlaying);
        currentPlaying += 1;
        if(currentPlaying === sequence.childElementCount){
            currentPlaying = 0;
        }
        activateNextElement(sequence.children[currentPlaying]);
    }, switchTimeout);
}

function idleHandler(){
    const carousels = document.querySelectorAll('.sequence');
    carousels.forEach((sequence) => {
        if (!sequence.classList.contains('idle')) {
            startCarousel(sequence);
        } 
    });
}

function stopCarousel(sequence) {
    sequence.classList.remove('idle');
    for(let item of sequence.children){
        deactivateCurrentElement(item);
    }
}

function interactionEventHandler(){
    const carousels = document.querySelectorAll('.sequence');
    carousels.forEach((sequence) => {
        if (sequence.classList.contains('idle')) {
            stopCarousel(sequence);
        }
    });
}

let activityDetector = () => {
    idleHandler();
    const resetTimer = () => {
        interactionEventHandler();
        clearTimeout(idleTimer);
        idleTimer = setTimeout(idleHandler,5000);
    }
    let idleTimer;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
}
activityDetector();