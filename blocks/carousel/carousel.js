export default function decorate(block) {
  const carouselElements = [...block.children];
  const sequence = document.createElement('div');
  carouselElements.forEach((div) => {
    const url = div[0].querySelector('div').textContent;
    const type = div[1].querySelector('div').textContent;
    const sequenceElement = document.createElement('div');
    sequenceElement.classList.add('hiddenElement');
    const media = document.createElement('video');
    media.autplay = true;
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
  