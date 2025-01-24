import Input from '@/components/common/input/input';
import * as S from '@/components/scenarioAct/AddInputForm/AddInputForm.style';

export default function AddInputForm() {
  return (
    <S.Container>
      <S.InputContainer>
        <S.InputTitle>Title</S.InputTitle>
        <Input placeholder="Enter scenario title." type="thin" />
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>Character</S.InputTitle>
        <Input placeholder="Select a role for the scenario." type="thin" />
      </S.InputContainer>
      <S.InputContainer>
        <S.InputTitle>Description</S.InputTitle>
        <Input placeholder="Describe the scenario." type="thin" />
      </S.InputContainer>
    </S.Container>
  );
}
