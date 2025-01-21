import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PaginationState } from '@tanstack/react-table';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { STATE } from '@/constants/state/state.ts';

import { useDispatch } from '@/hooks/common/useCustomRedux';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';
import ProgressBar from '@/components/dashboard/progressBar/progressBar';
import SelectBox from '@/components/dashboard/selectBox/selectBox';
import * as S from '@/components/dashboard/table/table.style';

import DownArrow from '@/assets/icons/arrow_down.svg?react';
import PreArrow from '@/assets/icons/arrow_left.svg?react';
import NextArrow from '@/assets/icons/arrow_right.svg?react';
import GreenArrow from '@/assets/icons/arrow_right_green.svg?react';
import RedArrow from '@/assets/icons/arrow_right_red.svg?react';
import UpArrow from '@/assets/icons/arrow_up.svg?react';
import type { TTableData } from '@/mocks/tableData';
import { pageData, tableData } from '@/mocks/tableData';
import { openModal } from '@/slices/modalSlice';

const columnHelper = createColumnHelper<TTableData>();

export default function Table() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState({
    state: false,
    page: false,
    date: false,
  });

  const dispatch = useDispatch();
  const [data] = useState(tableData);
  const [pagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleModal = (state: boolean) => {
    if (state) {
      // 성공의 경우 경로 수정
      navigate('/project/scenario/1');
    } else {
      dispatch(openModal(MODAL_TYPES.ErrorModal));
    }
  };

  const columns = [
    columnHelper.accessor('date', {
      header: () => (
        <S.ButtonHeader
          onClick={() =>
            setIsClicked((prev) => ({
              ...prev,
              date: !prev.date,
            }))
          }
        >
          <p>Date</p>
          {isClicked.date ? <UpArrow /> : <DownArrow />}
        </S.ButtonHeader>
      ),
      cell: (info) => info.getValue(),
      size: 400,
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      size: 200,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('page', {
      header: () => (
        <S.HeaderWrapper>
          <S.ButtonHeader
            onClick={() =>
              setIsClicked((prev) => ({
                ...prev,
                page: !prev.page,
              }))
            }
          >
            <p>Page</p>
            {isClicked.page ? <UpArrow /> : <DownArrow />}
          </S.ButtonHeader>
          {isClicked.page && <SelectBox selectList={pageData} />}
        </S.HeaderWrapper>
      ),
      size: 200,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('attainment', {
      header: 'Attainment',
      size: 200,
      cell: (info) => <ProgressBar percent={info.getValue()} />,
    }),
    columnHelper.accessor('state', {
      header: () => (
        <S.HeaderWrapper>
          <S.ButtonHeader
            onClick={() =>
              setIsClicked((prev) => ({
                ...prev,
                state: !prev.state,
              }))
            }
          >
            <p>State</p>
            {isClicked.state ? <UpArrow /> : <DownArrow />}
          </S.ButtonHeader>
          {isClicked.state && <SelectBox selectList={STATE} />}
        </S.HeaderWrapper>
      ),
      size: 200,
      cell: (info) => <S.State $isSuccess={info.getValue() === 'Success'}>{info.getValue()}</S.State>,
    }),
    columnHelper.accessor('time', {
      header: 'Time',
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor('user', {
      header: 'User',
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor('action', {
      size: 400,
      header: 'Action',
      cell: (info) => (
        <S.Action $isSuccess={info.getValue()} onClick={() => handleModal(info.getValue())}>
          <p>{info.getValue() ? 'Run Scenario' : 'Check the error'}</p>
          {info.getValue() ? <GreenArrow /> : <RedArrow />}
        </S.Action>
      ),
    }),
  ];

  /*TODO: 페이지네이션은 실제 데이터 연동하면서 진행하겠습니다 (현재 버튼을 눌러도 이동 X)*/
  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    pageCount: 10,
  });

  return (
    <S.TableContainer>
      <S.TableWrapper>
        <S.Table>
          <S.TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <S.Th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</S.Th>
                ))}
              </tr>
            ))}
          </S.TableHeader>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <S.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <S.Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</S.Td>
                ))}
              </S.Tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableWrapper>

      <S.PageNumberWrapper>
        <S.ArrowBox disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
          <PreArrow />
        </S.ArrowBox>
        {table.getPageOptions().map((page) => (
          <S.PageBtnBox key={page} onClick={() => table.setPageIndex(page)}>
            {page + 1}
          </S.PageBtnBox>
        ))}

        <S.ArrowBox disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
          <NextArrow />
        </S.ArrowBox>
      </S.PageNumberWrapper>
    </S.TableContainer>
  );
}
