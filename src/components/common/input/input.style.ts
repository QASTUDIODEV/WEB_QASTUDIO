import styled from 'styled-components';

// 예시 입니다. 해당 내용 삭제하고 input 컴포넌트 작성해주세요
const InputWrapper = styled.div`
  ${({ theme }) => theme.align.row_center};

  p {
    ${({ theme }) => theme.text.bold_28};
  }
`;

export { InputWrapper };
