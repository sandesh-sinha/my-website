function createVideoElement(url, type) {
  const media = document.createElement('video');
  media.classList.add('sequence-element-video');
  const source = document.createElement('source');
  source.src = url;
  source.type = type;
  media.append(source);
  return media;
}

async function parseEmbedSequence(block) {
  const childElements = [...block.children];
  const parsedChildElements = [];
  childElements.forEach((childElement) => {
    if(childElement.children[1].textContent === 'sequence'){
      const page = carouselElement.children[0].textContent;
      const embedCarousel = await fetch(page)
        .then(function(response) {
          return response.text();
        })
        .then(function(html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          return doc.querySelector('.carousel');
        });
      parsedChildElements.push(...embedCarousel.children);
    }
    else {
      parsedChildElements.push(childElement);
    }
  });
  return parsedChildElements;
}

export default function decorate(block) {
  const blockElements = [...block.children];
  const carouselElements = parseEmbedSequence(blockElements);
  const sequence = document.createElement('div');
  sequence.classList.add('sequence');
  carouselElements.forEach((carouselElement) => {
    const type = carouselElement.children[1].textContent;
    const sequenceElement = document.createElement('div');
    sequenceElement.classList.add('sequence-element', 'fadeIn');
    let media; 
    if(type === 'img') {
      media = carouselElement.querySelector('img');
      media.classList.add('sequence-element-video');
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
  