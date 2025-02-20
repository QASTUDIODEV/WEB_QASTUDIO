import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import type { TRequestCharacterScenarioResponse } from '@/types/scenario/scenario';

import { createCharacterModalScehma } from '@/utils/validate';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import useChangeScenarioInfo from '@/hooks/scenario/useChangeScenarioInfo.ts';

import ModalLoading from '@/components/common/loading/modalLoading';
import Modal from '@/components/common/modal/modal';
import ScenarioModalStep1 from '@/components/scenario/scenarioModal/scenarioModal/scenarioModalStep1';
import ScenarioModalStep2 from '@/components/scenario/scenarioModal/scenarioModal/scenarioModalStep2';

import { closeModal } from '@/slices/modalSlice.ts';

type TScenarioProps = {
  projectId?: string;
  currentPage?: number;
};

type TField = z.infer<typeof createCharacterModalScehma>;

export default function ScenarioModal({ projectId = '0', currentPage = 0 }: TScenarioProps) {
  const dispatch = useDispatch();
  const methods = useForm<TField>({
    mode: 'onChange',
    resolver: zodResolver(createCharacterModalScehma),
  });

  const [modalStep, setModalStep] = useState<number>(1); // 모달 단계 상태 (1: 역할 선택, 2: 역할 확인)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 선택된 옵션
  const [characterData, setCharacterData] = useState<TRequestCharacterScenarioResponse>();
  const [scenarioId, setScenarioId] = useState<number>(-1);
  const [characterId, setCharacterId] = useState<number>(-1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
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
    >
      {(postCharacterPending || patchCharacterPending) && <ModalLoading />}
      <FormProvider {...methods}>
        {modalStep === 1 && (
          <ScenarioModalStep1
            checked={checked}
            setChecked={setChecked}
            postCharacter={postCharacter}
            patchCharacter={patchCharacter}
            setCharacterData={setCharacterData}
            setModalStep={setModalStep}
            setSelectedOptions={setSelectedOptions}
            setIsSubmitted={setIsSubmitted}
            setScenarioId={setScenarioId}
            setCharacterId={setCharacterId}
            projectId={projectId}
            currentPage={currentPage}
            postCharacterPending={postCharacterPending}
            patchCharacterPending={patchCharacterPending}
            selectedOptions={selectedOptions}
            characterId={characterId}
            scenarioId={scenarioId}
            isSubmitted={isSubmitted}
          />
        )}
        {modalStep == 2 && <ScenarioModalStep2 characterData={characterData} setModalStep={setModalStep} />}
      </FormProvider>
    </Modal>
  );
}
