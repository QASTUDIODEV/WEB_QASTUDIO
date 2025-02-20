function getCssSelector(element: HTMLElement): string {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return '';

  let path: string[] = [];
  let currentElement: HTMLElement | null = element;

  while (currentElement && currentElement.nodeType === Node.ELEMENT_NODE) {
    let tagName = currentElement.tagName.toLowerCase();
    let selector = tagName;

    // id
    if (currentElement.id) {
      selector = `#${currentElement.id}`;
      path.unshift(selector);
      break;
    }

    // 클래스
    if (currentElement.classList.length > 0) {
      const classList = Array.from(currentElement.classList)
        .map((cls) => `.${cls}`)
        .join('');
      selector += classList;
    }

    // 형제 요소 중 몇 번째인지 추가 (`:nth-of-type(n)`)
    let index = 1;
    let sibling = currentElement.previousElementSibling as HTMLElement | null;
    while (sibling) {
      if (sibling.tagName.toLowerCase() === tagName) {
        index++;
      }
      sibling = sibling.previousElementSibling as HTMLElement | null;
    }
    if (index > 1) {
      selector += `:nth-of-type(${index})`;
    }

    path.unshift(selector);
    currentElement = currentElement.parentElement;
  }

  return path.join(' > '); // `>` 포함한 최종 셀렉터 반환
}

export default getCssSelector;
