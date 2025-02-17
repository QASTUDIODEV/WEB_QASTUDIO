import { useDispatch } from '@/hooks/common/useCustomRedux';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';

import * as S from './continueModal.style';

import { setStep } from '@/slices/scenarioActSlice';

type TContinueModal = {
  onClose: () => void;
  title?: string;
  description?: string;
};

export default function continueModal({ onClose, title, description }: TContinueModal) {
  const dispatch = useDispatch();
  const handleContinue = () => {
    dispatch(setStep(1));
    onClose();
  };
  return (
    <Modal title={title} onClose={onClose} isExitButtonVisible={false}>
      <S.Container>{description}</S.Container>
      <S.ButtonBox>
        <Button color={'blue'} onClick={handleContinue}>
          continue
        </Button>
      </S.ButtonBox>
    </Modal>
  );
}
