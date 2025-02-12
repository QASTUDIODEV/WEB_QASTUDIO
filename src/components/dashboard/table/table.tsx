import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { PaginationState } from '@tanstack/react-table';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

import type { TTestListDTO } from '@/types/test/test';
import { TEST_STATE } from '@/enums/enums';

import { getSelectName } from '@/utils/getSelectName';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';
import useTableFilter from '@/hooks/dashborad/useTableFilter';
import usePaginateTestList from '@/hooks/test/usePaginateTestList';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';
import ProgressBar from '@/components/dashboard/progressBar/progressBar';
import SearchBar from '@/components/dashboard/searchBar/searchBar';
import DateHeader from '@/components/dashboard/table/dateHeader';
import PageNameHeader from '@/components/dashboard/table/pageNameHeader';
import StateHeader from '@/components/dashboard/table/stateHeader';
import * as S from '@/components/dashboard/table/table.style';

import { GreenArrow, NextArrow, PreArrow, RedArrow } from '@/assets/icons';
import { openModal } from '@/slices/modalSlice';

const columnHelper = createColumnHelper<TTestListDTO>();

export default function Table() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { date } = useSelector((state) => state.calendar);
  const { state, testName, pageName, setFilters } = useTableFilter();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const { data: listData } = usePaginateTestList({
    projectId: Number(projectId),
    page: pagination.pageIndex,
    state,
    testName,
    date,
    pageName,
  });

  const handleModal = ({ success, testId }: { success: boolean; testId: number }) => {
    if (success) {
      navigate(`/scenarioAct/${projectId}`);
    } else {
      dispatch(openModal({ modalType: MODAL_TYPES.ErrorModal, modalProps: { testId: testId } }));
    }
  };

  const columns = [
    columnHelper.accessor('testDate', {
      header: ({ column }) => <DateHeader column={column} />,
      cell: (info) => info.getValue(),
      size: 400,
    }),
    columnHelper.accessor('testName', {
      header: 'Name',
      size: 200,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('pageName', {
      header: () => <PageNameHeader />,
      size: 200,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('attainment', {
      header: 'Attainment',
      size: 200,
      cell: (info) => <ProgressBar percent={info.getValue()} />,
    }),
    columnHelper.accessor('state', {
      header: () => <StateHeader />,
      size: 200,
      cell: (info) => <S.State $isSuccess={info.getValue() === TEST_STATE.SUCCESS}>{getSelectName(info.getValue())}</S.State>,
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
          onClick={() => handleModal({ success: info.row.original.state === TEST_STATE.SUCCESS, testId: info.row.original.testId })}
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
        <SearchBar setFilters={setFilters} />
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
