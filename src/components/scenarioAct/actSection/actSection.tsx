import { useEffect } from 'react';
import Frame, { useFrame } from 'react-frame-component';

import * as S from '@/components/scenarioAct/actSection/actSection.style';

export default function ActSection() {
  //  HTML
  const htmlContent: string = `
    <div class="container" id="main-container">
      <h1>메인</h1>
      <div class="nested-container" id="section-1">
        <h2>Section 1</h2>
        <div class="nested-item" id="item-1-1">Item 1-1</div>
        <div class="nested-item" id="item-1-2">Item 1-2</div>
        <div class="nested-item" id="item-1-3">Item 1-3</div>
      </div>
      <div class="nested-container" id="section-2">
        <h2>Section 2</h2>
        <div class="nested-item" id="item-2-1">Item 2-1</div>
        <div class="nested-item" id="item-2-2">Item 2-2</div>
        <div class="nested-item" id="item-2-3">Item 2-3</div>
      </div>
      <button id="clickButton" class="btn">Click Me</button>
    </div>
  `;

  const initialContent: string = `<!DOCTYPE html><html><head><style>
  body {
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .nested-container {
    padding: 10px;
    background: #f9f9f9;
    border: 1px solid #ccc;
    margin-top: 20px;
    border-radius: 4px;
  }
  .nested-item {
    margin-bottom: 10px;
    padding: 10px;
    background: #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
  }
  .nested-item:hover {
    background: #d0d0d0;
  }
  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  button:hover {
    background: #0056b3;
  }
</style></head><body><div id="mountHere"></div></body></html>`;

  return (
    <S.Container>
      <Frame
        style={{
          width: '100%',
          height: '100%',
        }}
        initialContent={initialContent}
        mountTarget="#mountHere"
      >
        <InnerComponent htmlContent={htmlContent} />
      </Frame>
    </S.Container>
  );
}

function InnerComponent({ htmlContent }: any) {
  const { document } = useFrame();
  // CSS 선택자 생성 함수
  const getCssSelector = (element: HTMLElement): string => {
    let path = '';
    while (element.parentElement) {
      const tag = element.tagName.toLowerCase();
      const id = element.id ? `#${element.id}` : '';
      const classes = element.className ? `.${element.className.split(' ').join('.')}` : '';
      path = `${tag}${id}${classes} > ${path}`;
      element = element.parentElement;
    }
    return path.slice(0, -3); // 마지막 ' > ' 제거
  };
  useEffect(() => {
    if (document) {
      document.body.innerHTML = htmlContent;

      // 클릭 이벤트 리스너 추가
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target) {
          console.log('=== Element Details ===');
          console.log(`Tag: ${target.tagName}`);
          console.log(`ID: ${target.id ? `#${target.id}` : '(none)'}`);
          console.log(`Class: ${target.className ? `.${target.className.split(' ').join('.')}` : '(none)'}`);
          console.log(`CSS Selector: ${getCssSelector(target)}`);
          console.log(`Inner HTML: ${target.innerHTML}`);
        }
      };

      // body에 이벤트 리스너 추가
      document.body.addEventListener('click', handleClick);

      return () => {
        document.body.removeEventListener('click', handleClick);
      };
    }
  }, [document, htmlContent]);

  return null;
}
