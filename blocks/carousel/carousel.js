export default function decorate(block) {
  const carouselElements = [...block.children];
  const sequence = document.createElement('div');
  sequence.classList.add('sequence');
  carouselElements.forEach((carouselElement) => {
    const url = carouselElement.children[0].textContent;
    const type = carouselElement.children[1].textContent;
    const sequenceElement = document.createElement('div');
    sequenceElement.classList.add('sequence-element');
    const media = document.createElement('video');
    media.setAttribute('autoplay', true);
    // add source to video element
    const source = document.createElement('source');
    source.src = url;
    source.type = type;
    media.append(source);
    sequenceElement.append(media);
    sequence.append(sequenceElement);
  })
  block.textContent = '';
  block.append(sequence);
}
  