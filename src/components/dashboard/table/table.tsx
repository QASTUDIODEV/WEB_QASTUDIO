import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { PaginationState } from '@tanstack/react-table';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

import type { TTestListDTO } from '@/types/test/test';
import { TEST_STATE } from '@/enums/enums.ts';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useDebounce from '@/hooks/common/useDebounce';
import usePaginateTestList from '@/hooks/test/usePaginateTestList';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';
import SearchBar from '@/components/common/searchBar/searchBar';
import Calendar from '@/components/dashboard/calendar/calendar';
import ProgressBar from '@/components/dashboard/progressBar/progressBar';
import PageNameHeader from '@/components/dashboard/table/pageNameHeader';
import StateHeader from '@/components/dashboard/table/stateHeader';
import * as S from '@/components/dashboard/table/table.style';

import DownArrow from '@/assets/icons/arrow_down.svg?react';
import PreArrow from '@/assets/icons/arrow_left.svg?react';
import NextArrow from '@/assets/icons/arrow_right.svg?react';
import GreenArrow from '@/assets/icons/arrow_right_green.svg?react';
import RedArrow from '@/assets/icons/arrow_right_red.svg?react';
import UpArrow from '@/assets/icons/arrow_up.svg?react';
import { openModal } from '@/slices/modalSlice';

const columnHelper = createColumnHelper<TTestListDTO>();

export default function Table() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { date } = useSelector((state) => state.calendar);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  const [isClicked, setIsClicked] = useState({
    state: false,
    date: false,
  });

  const [selectedPageName, setSelectedPageName] = useState<string | null>(null);
  const [selectState, setSelectState] = useState<TEST_STATE | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const { data: listData } = usePaginateTestList({
    projectId: Number(projectId),
    page: pagination.pageIndex,
    state: selectState ?? null,
    testName: debouncedSearch,
    date: date,
  });

  console.log(selectedPageName);

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

  const table = useReactTable({
    data: listData?.result.testList ?? [],
    columns,
    state: { pagination },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: listData?.result.totalPage ?? 1,
    onPaginationChange: setPagination,
    manualSorting: true,
  });

  const isEmpty = listData?.result.totalElements === 0;
  let contents;

  if (isEmpty) {
    contents = <S.Wrapper />;
  } else {
    contents = (
      <>
        {table.getRowModel().rows.map((row) => (
          <S.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <S.Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</S.Td>
            ))}
          </S.Tr>
        ))}
      </>
    );
  }

  return (
    <>
      <S.SearchBox>
        <SearchBar placeholder={'Search by name'} value={search} onChange={(e) => setSearch(e.target.value)} />
      </S.SearchBox>
      <S.TableContainer>
        <S.TableWrapper>
          <S.Table>
            <S.TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <S.Th key={header.id}> {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</S.Th>
                  ))}
                </tr>
              ))}
            </S.TableHeader>
            <tbody>{contents}</tbody>
          </S.Table>
        </S.TableWrapper>

        <S.PageNumberWrapper>
          <S.ArrowBox disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            <PreArrow />
          </S.ArrowBox>
          {(table.getPageOptions().length ? table.getPageOptions() : [0]).map((page) => (
            <S.PageBtnBox
              key={page}
              onClick={() => {
                table.setPageIndex(page);
              }}
              $cur={page === pagination.pageIndex}
            >
              {page + 1}
            </S.PageBtnBox>
          ))}

          <S.ArrowBox disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            <NextArrow />
          </S.ArrowBox>
        </S.PageNumberWrapper>
      </S.TableContainer>
    </>
  );
}
