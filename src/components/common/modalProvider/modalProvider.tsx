import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import AuthModal from '@/components/auth/authModal/authModal';
import InviteErrorModal from '@/components/auth/inviteModal/inviteErrorModal';
import InviteSuccessModal from '@/components/auth/inviteModal/inviteSuccessModal';
import InviteTokenExpiredModal from '@/components/auth/inviteModal/inviteTokenExpiredModal';
import LogoutModal from '@/components/common/sidebar/logtoutModal/logoutModal';
import ProjectModal from '@/components/common/sidebar/projectModal/projectModal';
import ErrorModal from '@/components/dashboard/errorModal/errorModal';
import InviteModal from '@/components/projectInfo/inviteModal/inviteModal';
import CreatePageModal from '@/components/projectInfo/pageModal/pageModal';
import ScenarioModal from '@/components/scenario/scenarioModal/scenarioModal';

import { closeModal, selectModal } from '@/slices/modalSlice';

export const MODAL_TYPES = {
  ErrorModal: 'ErrorModal',
  InviteModal: 'InviteModal',
  CreatePageModal: 'CreatePageModal',
  AuthModal: 'AuthModal',
  CreateProjectModal: 'CreateProjectModal',
  LogoutModal: 'LogoutModal',
  ScenarioModal: 'ScenarioModal',
  InviteErrorModal: 'InviteErrorModal',
  InviteSuccessModal: 'InviteSuccessModal',
  InviteTokenExpiredModal: 'InviteTokenExpiredModal',
};

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.ErrorModal]: ErrorModal,
  [MODAL_TYPES.InviteModal]: InviteModal,
  [MODAL_TYPES.InviteErrorModal]: InviteErrorModal,
  [MODAL_TYPES.InviteSuccessModal]: InviteSuccessModal,
  [MODAL_TYPES.InviteTokenExpiredModal]: InviteTokenExpiredModal,
  [MODAL_TYPES.CreatePageModal]: CreatePageModal,
  [MODAL_TYPES.AuthModal]: AuthModal,
  [MODAL_TYPES.CreateProjectModal]: ProjectModal,
  [MODAL_TYPES.LogoutModal]: LogoutModal,
  [MODAL_TYPES.ScenarioModal]: ScenarioModal,
};

export default function ModalProvider() {
  const { modalType, isOpen, modalProps } = useSelector(selectModal);
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    dispatch(closeModal());
  }, [location, dispatch]);

  if (!isOpen) return null;

  const ModalComponent = MODAL_COMPONENTS[modalType];
  if (!ModalComponent) return null;

  return <ModalComponent onClose={() => dispatch(closeModal())} {...modalProps} />;
}
