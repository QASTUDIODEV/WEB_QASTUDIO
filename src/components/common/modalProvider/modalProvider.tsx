import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { clearModals, closeModal } from '@/slices/modalSlice';
import type { TRootState } from '@/store/store';

export default function ModalProvider() {
  const { modals } = useSelector((state: TRootState) => state.modal);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearModals());
  }, [location, dispatch]);

  return (
    <>
      {modals.map((Modal, index) => (
        <Modal key={index} onClose={() => dispatch(closeModal(index))} />
      ))}
    </>
  );
}
