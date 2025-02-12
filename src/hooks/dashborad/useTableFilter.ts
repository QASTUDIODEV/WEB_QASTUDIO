import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { TEST_STATE } from '@/enums/enums.ts';

export type TFilter = {
  testName?: string;
  pageName?: string;
  state?: TEST_STATE;
  date?: string;
};

export default function useTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = searchParams.get('state') ? (searchParams.get('state') as TEST_STATE) : undefined;
  const pageName = searchParams.get('pageName') ? (searchParams.get('pageName') as string) : undefined;
  const testName = searchParams.get('testName') ? (searchParams.get('testName') as string) : undefined;
  const date = searchParams.get('date') ? (searchParams.get('date') as string) : undefined;

  const setFilters = useCallback((filters: TFilter) => {
    setSearchParams((params) => {
      if (filters.state !== undefined) params.set('state', filters.state);
      if (filters.pageName !== undefined) params.set('pageName', filters.pageName);
      if (filters.testName !== undefined) params.set('testName', filters.testName);
      if (filters.date !== undefined) params.set('date', filters.date);

      return params;
    });
  }, []);

  return {
    date,
    state,
    pageName,
    testName,
    setFilters,
  };
}
