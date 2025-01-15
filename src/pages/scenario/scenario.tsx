import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux.ts';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import Modal from '@/components/common/modal/modal';
import ButtonGroup from '@/components/scenario/buttonGroup/buttonGroup';
import CharacterList from '@/components/scenario/characterList/characterList';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import * as S from '@/pages/scenario/scenario.style';
import { setOpen } from '@/slices/modalSlice.ts';

export default function ScenarioPage() {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <S.Background>
      {isOpen && (
        // 모달 컴포넌트 구분
        <Modal title="Create  Character" onClose={() => dispatch(setOpen())}>
          <S.ModalContainer>
            <div>
              <S.description>Define users for the registered project.</S.description>
              <S.description>QASTUDIO will create a suitable scenario for you.</S.description>
            </div>

            <S.InputTitle>Name</S.InputTitle>
            <Input placeholder="Define the target character in one sentence." width="100%" />
            <S.InputTitle>Description</S.InputTitle>
            <Input placeholder="Explain the character's purpose for using the project." width="100%" />
            <S.InputTitle>Access page</S.InputTitle>
            <Input placeholder="Select pages accessible to the character." width="100%" />

            <S.ButtonContainer>
              <S.ButtonWrapper>
                <Button color="blue">Create</Button>
              </S.ButtonWrapper>
            </S.ButtonContainer>
          </S.ModalContainer>
        </Modal>
      )}
      <S.Container>
        <S.Header>
          <h1>UMC_PM_DAY</h1>
        </S.Header>

        <ButtonGroup />

        <S.CharactersContainer>
          <CharacterList />
        </S.CharactersContainer>
      </S.Container>

      <S.Pagination>
        <ArrowLeft />
        <S.PageNumber>1</S.PageNumber>
        <ArrowRight />
      </S.Pagination>
    </S.Background>
  );
}
