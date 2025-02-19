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
import ChangeOwnerModal from '@/components/projectInfo/ChangeOwnerModal/changeOwnerModal';
import DeleteProjectModal from '@/components/projectInfo/deleteProjectModal/deleteProjectModal';
import DeleteTeamMember from '@/components/projectInfo/deleteTeamMember/deleteTeamMemberModal';
import EditProjectModal from '@/components/projectInfo/editProjectModal/editProjectModal';
import InviteModal from '@/components/projectInfo/inviteModal/inviteModal';
import CreatePageModal from '@/components/projectInfo/pageModal/pageModal';
import ScenarioModal from '@/components/scenario/scenarioModal/scenarioModal';
import ContinueModal from '@/components/scenarioAct/continueModal/continueModal';
import ScenarioActModal from '@/components/scenarioAct/scenarioActModal/scenarioActModal';

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
  ScenarioActErrorModal: 'ScenarioActErrorModal',
  EditProjectModal: 'EditProjectModal',
  DeleteProjectModal: 'DeleteProjectModal',
  ContinueModal: 'ContinueModal',
  ChangeOwnerModal: 'ChangeOwnerModal',
  DeleteTeamMember: 'DeleteTeamMember',
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
  [MODAL_TYPES.ScenarioActErrorModal]: ScenarioActModal,
  [MODAL_TYPES.EditProjectModal]: EditProjectModal,
  [MODAL_TYPES.DeleteProjectModal]: DeleteProjectModal,
  [MODAL_TYPES.ContinueModal]: ContinueModal,
  [MODAL_TYPES.ChangeOwnerModal]: ChangeOwnerModal,
  [MODAL_TYPES.DeleteTeamMember]: DeleteTeamMember,
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
