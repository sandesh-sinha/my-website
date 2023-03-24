export default function decorate(block) {
    const video = [...block.children];
    const media = document.createElement('video');
    media.preload = true;
    // add source to video element
    const source = document.createElement('source');
    source.src = video[0].innerHTML;
    source.type = video[1].innerHTML;
    videoElement.append(sourceElement)
    block.append(videoElement);
}
  