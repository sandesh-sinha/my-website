function createVideoElement(url, type) {
  const media = document.createElement('video');
  media.classList.add('sequence-element-video');
  const source = document.createElement('source');
  source.src = url;
  source.type = type;
  media.append(source);
  return media;
}

async function parseEmbedSequence(childElements) {
  const parsedChildElements = [];
  childElements.forEach(async (childElement) => {
    if(childElement.children[1].textContent === 'sequence'){
      const pageURL = childElement.children[0].textContent;
      const page = await fetch(pageURL);
      const responseText = await page.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(responseText, "text/html");
      const embedCarousel =  doc.querySelector('.carousel');
      parsedChildElements.push(...embedCarousel.children);
    }
    else {
      parsedChildElements.push(childElement);
    }
  });
  return parsedChildElements;
}

export default async function decorate(block) {
  const blockElements = [...block.children];
  const carouselElements = await parseEmbedSequence(blockElements);
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
  