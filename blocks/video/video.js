export default function decorate(block) {
    const video = [...block.children];
    const media = document.createElement('video');
    media.preload = true;
    // add source to video element
    const source = document.createElement('source');
    source.src = video[0].querySelector('div').innerHTML;
    source.type = video[1].querySelector('div').innerHTML;
    media.append(source);
    block.textContent = '';
    block.append(media);
}
  