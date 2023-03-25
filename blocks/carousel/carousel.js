function createVideoElement(url, type) {
  const media = document.createElement('video');
  media.classList.add('sequence-element-video');
  const source = document.createElement('source');
  source.src = url;
  source.type = type;
  media.append(source);
  return media;
}

export default function decorate(block) {
  const carouselElements = [...block.children];
  const sequence = document.createElement('div');
  sequence.classList.add('sequence');
  carouselElements.forEach((carouselElement) => {
    const type = carouselElement.children[1].textContent;
    const sequenceElement = document.createElement('div');
    sequenceElement.classList.add('sequence-element', 'fadeIn');
    let media; 
    if(type === 'img') {
      media = carouselElement.querySelector('img');
    }
    else {
      const url = carouselElement.children[0].textContent;
      media = createVideoElement(url, type);
    }
    sequenceElement.append(media);
    sequence.append(sequenceElement);
  })
  block.textContent = '';
  block.append(sequence);
}
  