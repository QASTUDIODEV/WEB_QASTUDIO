import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';

import type { TTestListDTO } from '@/types/test/test';
import { TEST_STATE } from '@/enums/enums';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';

import PageNameHeader from './pageNameHeader';
import StateHeader from './stateHeader';
import * as S from './tableHeader.style';
import Calendar from '../calendar/calendar';
import ProgressBar from '../progressBar/progressBar';

import { DownArrow, GreenArrow, RedArrow, UpArrow } from '@/assets/icons';
import { openModal } from '@/slices/modalSlice';

const columnHelper = createColumnHelper<TTestListDTO>();

export default function TableHeader() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isClicked, setIsClicked] = useState({
    state: false,
    date: false,
  });

  const dispatch = useDispatch();

  const [selectedPageName, setSelectedPageName] = useState<string | null>(null);
  const [selectState, setSelectState] = useState<TEST_STATE | null>(null);

  const handleModal = ({ state, testId }: { state: boolean; testId: number }) => {
    if (state) {
      navigate(`/scenarioAct/${projectId}`);
    } else {
      dispatch(openModal({ modalType: MODAL_TYPES.ErrorModal, modalProps: { testId: testId } }));
    }
  };

  const columns = [
    columnHelper.accessor('testDate', {
      header: ({ column }) => (
        <S.HeaderWrapper>
          <S.ButtonHeader
            onClick={() =>
              setIsClicked((prev) => ({
                ...prev,
                date: !prev.date,
              }))
            }
          >
            <p>Date</p>
            {column.getIsSorted() ? <UpArrow /> : <DownArrow />}
          </S.ButtonHeader>

          {isClicked.date && <Calendar />}
        </S.HeaderWrapper>
      ),
      cell: (info) => info.getValue(),
      size: 400,
    }),
    columnHelper.accessor('testName', {
      header: 'Name',
      size: 200,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('pageName', {
      header: () => <PageNameHeader onSelect={setSelectedPageName} />,
      size: 200,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('attainment', {
      header: 'Attainment',
      size: 200,
      cell: (info) => <ProgressBar percent={info.getValue()} />,
    }),
    columnHelper.accessor('state', {
      header: () => <StateHeader onSelect={setSelectState} />,
      size: 200,
      cell: (info) => <S.State $isSuccess={info.getValue() === TEST_STATE.SUCCESS}>{info.getValue() === TEST_STATE.SUCCESS ? 'Success' : 'Fail'}</S.State>,
    }),
    columnHelper.accessor('time', {
      header: 'Time',
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor('nickname', {
      header: 'User',
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: (info) => (
        <S.Action
          $isSuccess={info.row.original.state === TEST_STATE.SUCCESS}
          onClick={() => handleModal({ state: info.row.original.state === TEST_STATE.SUCCESS, testId: info.row.original.testId })}
        >
          <p>{info.row.original.state === TEST_STATE.SUCCESS ? 'Run Scenario' : 'Check the error'}</p>
          {info.row.original.state === TEST_STATE.SUCCESS ? <GreenArrow /> : <RedArrow />}
        </S.Action>
      ),
      size: 400,
    }),
  ];

  return {
    selectedPageName,
    selectState,
    columns,
  };
}
