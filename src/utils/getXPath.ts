function getXPath(element: HTMLElement) {
  let xpath = '';
  let currentElement: HTMLElement | null = element;

  while (currentElement && currentElement.nodeType === Node.ELEMENT_NODE) {
    let tagName = currentElement.tagName.toLowerCase();

    // html, body 중복 제거
    if (tagName === 'html' && xpath.includes('/html')) break;

    let index = 1;
    let sibling = currentElement.previousElementSibling;
    while (sibling) {
      if (sibling.tagName.toLowerCase() === tagName) {
        index++;
      }
      sibling = sibling.previousElementSibling as HTMLElement;
    }

    xpath = `/${tagName}[${index}]${xpath}`;
    currentElement = currentElement.parentElement;
  }

  // 최종 중복 제거
  xpath = xpath.replace('/html/html', '/html').replace('/body/body', '/body');

  return xpath;
}

export default getXPath;
