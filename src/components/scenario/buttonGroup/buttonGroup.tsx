import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux.ts';
import useEditScenario from '@/hooks/scenario/useEditScenario';

import Button from '@/components/common/button/button';
import * as S from '@/components/scenario/buttonGroup/buttonGroup.style';
import CheckBox from '@/components/scenario/checkBox/checkBox';

import Add from '@/assets/icons/add.svg?react';
import Delete from '@/assets/icons/del.svg?react';
import Done from '@/assets/icons/done.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import ExclamationCircle from '@/assets/icons/exclamation_circle.svg?react';
import Play from '@/assets/icons/play.svg?react';
import { openModal } from '@/slices/modalSlice.ts';
import { deleteCharacters, deleteScenarios, edit, resetChecks } from '@/slices/scenarioSlice';

type TScenarioProps = {
  projectId: string;
};
export default function ButtonGroup({ projectId }: TScenarioProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isEdit, characters } = useSelector((state) => state.scenario);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number[]>();
  const [selectedScenarioId, setSelectedScenarioId] = useState<number[]>();
  const { useDeleteSceanrio, useDeleteCharacter } = useEditScenario();
  const [hasCheckedItems, setHasCheckedItems] = useState<boolean>(false);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const { mutate: deleteSceanrioMutate } = useDeleteSceanrio;
  const { mutate: deleteCharacterMutate } = useDeleteCharacter;

  useEffect(() => {
    setSelectedCharacterId(characters.filter((character) => character.isChecked).map((character) => character.id));
    setSelectedScenarioId(
      characters.flatMap((character) =>
        character.scenarios.scenarioList && Array.isArray(character.scenarios.scenarioList)
          ? character.scenarios.scenarioList.filter((scenario) => scenario.isChecked).map((scenario) => scenario.scenarioId)
          : [],
      ),
    );
  }, [characters]);

  useEffect(() => {
    const hasChecked = characters.some((character) => character.isChecked || character.scenarios.scenarioList.some((scenario) => scenario.isChecked));
    setHasCheckedItems(hasChecked);
  }, [characters]);

  // Delete 버튼 클릭 함수
  const handleDeleteClick = (): void => {
    if (hasCheckedItems) {
      dispatch(edit(true));
      dispatch(resetChecks());
      setHasCheckedItems(true);
      if (selectedScenarioId !== undefined && selectedScenarioId.length > 0) {
        deleteSceanrioMutate(selectedScenarioId, {
          onSuccess: (_, variables) => {
            variables.map((id) => deleteScenarios(id));
          },
        });
      }
      if (selectedCharacterId !== undefined && selectedCharacterId.length > 0) {
        deleteCharacterMutate(selectedCharacterId, {
          onSuccess: (_, variables) => {
            variables.map((id) => deleteCharacters(id));
          },
        });
      }
    }
  };

  // Done 버튼 클릭 함수
  const handleDoneClick = (): void => {
    dispatch(edit(false));
    dispatch(resetChecks());
    setHasCheckedItems(true);
  };

  // Edit 버튼 클릭 함수
  const handleEditClick = (): void => {
    dispatch(edit(true));
    dispatch(resetChecks());
    setHasCheckedItems(true);
  };

  // Play 버튼 클릭 함수
  const handlePlayClick = (): void => {
    navigate(`/scenarioAct/${projectId}`);
  };

  // + Character 버튼 클릭 함수
  const handleAddClick = (): void => {
    // 역할 추가 모달 띄우기
    dispatch(openModal('scenarioModal'));
  };

  return (
    <>
      {isEdit ? (
        <S.EditButtonGroup>
          <S.AllCheckBoxGroup onClick={() => setIsAllChecked(!isAllChecked)}>
            <S.IconContainer>
              <CheckBox isAllCheckBox={isAllChecked} />
            </S.IconContainer>
            <p>ALL</p>
            {!hasCheckedItems && (
              <S.ErrorMessage>
                <ExclamationCircle />
                You must select at least one.
              </S.ErrorMessage>
            )}
          </S.AllCheckBoxGroup>
          <S.ButtonGroup>
            <Button type="normal" color="default" disabled={false} icon={<Delete />} iconPosition="left" onClick={handleDeleteClick}>
              Delete
            </Button>
            <Button type="normal" color="default" disabled={false} icon={<Done />} iconPosition="left" onClick={handleDoneClick}>
              Done
            </Button>
          </S.ButtonGroup>
        </S.EditButtonGroup>
      ) : (
        <S.ButtonGroup>
          <Button type="normal" color="default" disabled={false} icon={<Play />} iconPosition="right" onClick={handlePlayClick}>
            Play
          </Button>
          <Button type="normal" color="default" disabled={false} icon={<Edit />} iconPosition="left" onClick={handleEditClick}>
            Edit
          </Button>
          <Button type="normal" color="default" disabled={false} icon={<Add />} iconPosition="left" onClick={handleAddClick}>
            Character
          </Button>
        </S.ButtonGroup>
      )}
    </>
  );
}
