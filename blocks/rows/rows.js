export default function decorate(block) {
    const rows = [...block.firstElementChild.children];
    block.classList.add(`rows-${rows.length}-cols`); // does nothing!!!
  }
  