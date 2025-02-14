function getXPath(element: HTMLElement): string {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return '';

  let xpath = '';
  let currentElement: HTMLElement | null = element;

  while (currentElement && currentElement.nodeType === Node.ELEMENT_NODE) {
    let tagName = currentElement.tagName.toLowerCase();

    // 특정 속성이 있으면 XPath에 추가
    if (currentElement.id) {
      // `id`가 존재하면 절대 XPath로 사용 가능
      xpath = `//*[@id="${currentElement.id}"]${xpath}`;
      break;
    } else if (tagName === 'a' && currentElement.hasAttribute('href')) {
      // `a` 태그의 `href` 속성 포함 (`//a[@href='...']`)
      xpath = `//a[@href='${currentElement.getAttribute('href')}']`;
      break;
    } else {
      // 형제 요소 중 몇 번째인지 계산하여 index 추가
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
  }

  // 최종 XPath 중복 제거
  xpath = xpath.replace('/html/html', '/html').replace('/body/body', '/body');

  return xpath.startsWith('//') ? xpath : `/${xpath}`;
}

export default getXPath;
