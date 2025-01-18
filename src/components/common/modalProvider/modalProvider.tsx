import { useDispatch, useSelector } from 'react-redux';

import ErrorModal from '@/components/dashboard/errorModal/errorModal.tsx';

import { closeModal, selectModal } from '@/slices/modalSlice';

export const MODAL_TYPES = {
  ErrorModal: 'ErrorModal',
};

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.ErrorModal]: ErrorModal,
};

export default function ModalProvider() {
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const ModalComponent = MODAL_COMPONENTS[modalType];
  if (!ModalComponent) return null;

  return <ModalComponent onClose={() => dispatch(closeModal())} />;
}
