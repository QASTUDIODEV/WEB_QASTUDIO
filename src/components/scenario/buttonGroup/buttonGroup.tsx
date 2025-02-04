import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { queryClient } from '@/apis/queryClient';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux.ts';
import useEditScenario from '@/hooks/scenario/useChangeScenarioInfo.ts';

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
  currentPage: number;
};
export default function ButtonGroup({ projectId, currentPage }: TScenarioProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isEdit, characters } = useSelector((state) => state.scenario);

  const [hasCheckedItems, setHasCheckedItems] = useState<boolean | undefined>(undefined);
  const [isFirst, setIsFirst] = useState<boolean>(true);

  const { useDeleteSceanrio, useDeleteCharacter } = useEditScenario();
  const { mutate: deleteSceanrioMutate } = useDeleteSceanrio;
  const { mutate: deleteCharacterMutate } = useDeleteCharacter;

  const selectedCharacterId = useMemo(() => characters.filter((char) => char.isChecked).map((char) => char.id), [characters]);
  const selectedScenarioId = useMemo(() => {
    const selectedCharacterIds = new Set(characters.filter((char) => char.isChecked).map((char) => char.id));
    return characters.flatMap((char) =>
      !selectedCharacterIds.has(char.id) && char.scenarios?.scenarioList
        ? char.scenarios.scenarioList.filter((scn) => scn.isChecked).map((scn) => scn.scenarioId)
        : [],
    );
  }, [characters]);

  useEffect(() => {
    const hasChecked = (selectedCharacterId?.length ?? 0) > 0 || (selectedScenarioId?.length ?? 0) > 0;
    setHasCheckedItems(hasChecked);
  }, [characters]);

  // Delete 버튼 클릭 함수
  const handleDeleteClick = (): void => {
    setIsFirst(false);
    if (hasCheckedItems) {
      dispatch(edit(true));
      dispatch(resetChecks());
      setHasCheckedItems(true);
      if (selectedCharacterId.length > 0) {
        deleteCharacterMutate(selectedCharacterId, {
          onSuccess: (_, variables) => {
            variables.map((id) => deleteCharacters(id));
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_CHARACTER_LIST({ currentPage, projectId }) });
            dispatch(edit(false));
            setIsFirst(true);
          },
        });
      }
      if (selectedScenarioId.length > 0) {
        deleteSceanrioMutate(selectedScenarioId, {
          onSuccess: (_, variables) => {
            variables.map((id) => deleteScenarios(id));
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_CHARACTER_LIST({ currentPage, projectId }) });
            dispatch(edit(false));
            setIsFirst(true);
          },
        });
      }
    } else {
      setHasCheckedItems(false);
    }
  };

  // Done 버튼 클릭 함수
  const handleDoneClick = (): void => {
    setHasCheckedItems(undefined);
    setIsFirst(true);
    dispatch(edit(false));
    dispatch(resetChecks());
  };

  // Edit 버튼 클릭 함수
  const handleEditClick = (): void => {
    setHasCheckedItems(undefined);
    setIsFirst(true);
    dispatch(edit(true));
    dispatch(resetChecks());
  };

  // Play 버튼 클릭 함수
  const handlePlayClick = () => navigate(`/scenarioAct/${projectId}`);

  // + Character 버튼 클릭 함수
  const handleAddClick = () => dispatch(openModal('scenarioModal'));

  return (
    <>
      {isEdit ? (
        <S.EditButtonGroup>
          <S.AllCheckBoxGroup>
            <S.IconContainer>
              <CheckBox isButtonGroup={true} />
            </S.IconContainer>
            <p>ALL</p>
            {hasCheckedItems === false && isFirst === false && (
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
