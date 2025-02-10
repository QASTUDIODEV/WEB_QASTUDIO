import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';
import { useUploadZipFile } from '@/hooks/projectInfo/useUploadZip';
import useProjectList from '@/hooks/sidebar/sidebar';

import Button from '@/components/common/button/button';
import Loading from '@/components/common/loading/loading';
import Modal from '@/components/common/modal/modal';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';
import ProjectProfile from '@/components/common/sidebar/projectProfile/projectProfile';

import ProjectInfoPage from '../projectInfo/projectInfo';

import Upload from '@/assets/icons/upload.svg?react';
import * as S from '@/pages/addProject/addProject.style';
import { openModal } from '@/slices/modalSlice';

export default function AddProjectPage() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { useUploadFile } = useUploadZipFile();
  const { useProjectExtractInfo } = useProjectInfo({ projectId: Number(projectId) });
  const { data, isSuccess, isError: projectInfoError } = useProjectExtractInfo;
  const { useGetProjectList } = useProjectList();
  const { data: projectList, isSuccess: isProjectListLoaded } = useGetProjectList;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (localStorage.getItem('InvitationResponse') === 'success') {
      dispatch(openModal({ modalType: MODAL_TYPES.InviteSuccessModal }));
    }
    if (localStorage.getItem('InvitationResponse') === 'error') {
      dispatch(openModal({ modalType: MODAL_TYPES.InviteErrorModal }));
    }
  }, []);

  useEffect(() => {
    if (!hasNavigated.current && isProjectListLoaded && projectList?.result?.projectList?.length) {
      const firstProjectId = projectList.result.projectList[0].projectId;
      const currentPath = location.pathname;
      if (firstProjectId && !currentPath.includes(`/project/information/`)) {
        navigate(`/project/information/${firstProjectId}`);
        hasNavigated.current = true;
      }
    }
    queryClient.invalidateQueries({ queryKey: ['getProjectList'] });
  }, [isProjectListLoaded, projectList, navigate]);

  const { mutate: uploadZipFile, isError, isSuccess: success, isPending } = useUploadFile;
  const zipFileRef = useRef<HTMLInputElement | null>(null);

  const [modal, setModal] = useState(false);

  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if (isError) {
      setModal(true);
    }
  }, [isError]);

  const ModalClose = () => {
    setModal(false);
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('application/zip') || isUploaded) {
      return;
    }

    setIsUploaded(true);

    uploadZipFile(
      { projectId: Number(projectId), zipFile: file },
      {
        onSuccess: (res) => {
          console.log('Upload success:', res);
          setIsUploaded(true);
        },
        onError: (err) => {
          console.error('Upload failed:', err);
          setIsUploaded(false);
        },
      },
    );
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
      e.target.value = '';
    }
  };
  if (isPending) {
    return (
      <S.Container>
        <Loading />
      </S.Container>
    );
  }
  if (projectInfoError) {
    return (
      <S.Container>
        <S.Error>권한이 없습니다</S.Error>
      </S.Container>
    );
  }
  return success || data?.result.viewType ? (
    <ProjectInfoPage projectInfo={data} />
  ) : (
    <S.Container>
      {projectList?.result.projectList[0] && (
        <>
          {projectId && isSuccess && (
            <S.ProfileWrapper>
              <S.Profile>
                <S.Wrapper>
                  <ProjectProfile profileImg={data.result.projectImage} />
                </S.Wrapper>
                <S.ProfileName>{data.result.projectName}</S.ProfileName>
              </S.Profile>
            </S.ProfileWrapper>
          )}
          <S.Title>Add Project File</S.Title>
          <S.Text>
            Please enter the project folder for AI to understand the project. <br />
            Please compress and enter the React JS/TS file.
          </S.Text>
          <S.Box>
            <label htmlFor="zipFile">
              <Button type="normal" color="blue" icon={<Upload />} iconPosition="left" disabled={isUploaded}>
                {isUploaded ? 'File Uploaded' : 'Upload Project File (.zip)'}
              </Button>
              <S.HiddenInput type="file" id="zipFile" name="zipFile" accept=".zip, .ZIP" ref={zipFileRef} onChange={(e) => handleInputChange(e)} />
            </label>
          </S.Box>
          {modal && (
            <Modal title="Request Failed" onClose={ModalClose}>
              <S.ModalBox>
                File extensions are only .zip files.
                <S.BtnWrapper>
                  <Button type="normal" color="blue" onClick={ModalClose}>
                    OK
                  </Button>
                </S.BtnWrapper>
              </S.ModalBox>
            </Modal>
          )}
        </>
      )}
    </S.Container>
  );
}
