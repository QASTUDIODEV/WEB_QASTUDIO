import * as S from './selectBox.style';

type TSelectBoxProps = {
  selectList: string[];
};

export default function SelectBox({ selectList }: TSelectBoxProps) {
  return (
    <S.Container>
      {selectList.map((e, idx) => (
        <li key={idx}>{e}</li>
      ))}
    </S.Container>
  );
}
