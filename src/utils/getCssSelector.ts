function getCssSelector(element: HTMLElement): string {
  let path = '';
  while (element.parentElement) {
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const classes = element.className ? `.${element.className.split(' ').join('.')}` : '';
    path = `${tag}${id}${classes} > ${path}`;
    element = element.parentElement;
  }
  return path.slice(0, -3); // 마지막 ' > ' 제거
}

export default getCssSelector;
