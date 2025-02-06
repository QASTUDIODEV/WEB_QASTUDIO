import { useState } from 'react';

import type { TRequestCharacterScenarioResponse } from '@/types/scenario/scenario';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import useChangeScenarioInfo from '@/hooks/scenario/useChangeScenarioInfo.ts';

import Modal from '@/components/common/modal/modal';
import ScenarioModalStep1 from '@/components/scenario/scenarioModal/scenarioModal/scenarioModalStep1';
import ScenarioModalStep2 from '@/components/scenario/scenarioModal/scenarioModal/scenarioModalStep2';

import { closeModal } from '@/slices/modalSlice.ts';

type TScenarioProps = {
  projectId: string;
  currentPage: number;
};

export default function ScenarioModal({ projectId, currentPage }: TScenarioProps) {
  const dispatch = useDispatch();

  const [modalStep, setModalStep] = useState<number>(1); // 모달 단계 상태 (1: 역할 선택, 2: 역할 확인)
  const [characterData, setCharacterData] = useState<TRequestCharacterScenarioResponse>();

  const { usePostCharacter, usePatchCharacter } = useChangeScenarioInfo();
  const { mutate: postCharacter, isPending: postCharacterPending } = usePostCharacter;
  const { mutate: patchCharacter, isPending: patchCharacterPending } = usePatchCharacter;

  return (
    <Modal
      title={'Create Character'}
      onClose={() => {
        if (!postCharacterPending && !patchCharacterPending) {
          dispatch(closeModal());
        }
      }}
      clickOutside={false}
    >
      {modalStep === 1 && (
        <ScenarioModalStep1
          postCharacter={postCharacter}
          patchCharacter={patchCharacter}
          projectId={projectId}
          currentPage={currentPage}
          setCharacterData={setCharacterData}
          setModalStep={setModalStep}
          postCharacterPending={postCharacterPending}
          patchCharacterPending={patchCharacterPending}
        />
      )}
      {modalStep == 2 && <ScenarioModalStep2 characterData={characterData} setModalStep={setModalStep} />}
    </Modal>
  );
}
