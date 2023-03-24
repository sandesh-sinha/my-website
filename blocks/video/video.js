export default function decorate(block) {
    const video = [...block.children];
    const media = document.createElement('video');
    media.preload = true;
    // add source to video element
    const source = document.createElement('source');
    source.src = video[0].div.innerHTML;
    source.type = video[1].div.innerHTML;
    media.append(source)
    // video.forEach((element) => block.remove(element));
    block.append(media);
}
  