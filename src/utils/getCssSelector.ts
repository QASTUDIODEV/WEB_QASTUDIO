function getCssSelector(element: HTMLElement): string {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return '';

  let path = [];
  let currentElement: HTMLElement | null = element;

  while (currentElement && currentElement.nodeType === Node.ELEMENT_NODE) {
    let tagName = currentElement.tagName.toLowerCase();
    let selector = tagName;

    //  `id`가 있으면 `#id` 형식으로 사용
    if (currentElement.id) {
      selector = `#${currentElement.id}`;
      path.unshift(selector);
      break;
    }

    //  `class`가 있으면 `.class1.class2` 형식 추가
    if (currentElement.className) {
      const classList = currentElement.className
        .trim()
        .split(/\s+/)
        .map((cls) => `.${cls}`)
        .join('');
      selector += classList;
    }

    //  형제 요소 중 몇 번째인지 추가 (`:nth-of-type(n)`)
    let index = 1;
    let sibling = currentElement.previousElementSibling;
    while (sibling) {
      if (sibling.tagName.toLowerCase() === tagName) {
        index++;
      }
      sibling = sibling.previousElementSibling as HTMLElement;
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
