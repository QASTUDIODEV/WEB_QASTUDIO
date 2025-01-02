import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector } from 'react-redux';

import type { TAppDispatch, TRootState } from '@/store/store.ts';

export const useDispatch: () => TAppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<TRootState> = useDefaultSelector;
