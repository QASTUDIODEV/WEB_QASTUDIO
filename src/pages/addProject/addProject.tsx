import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';
import { useUploadZipFile } from '@/hooks/projectInfo/useUploadZip';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';
import Profile from '@/components/common/profile/profile';

import ProjectInfoPage from '../projectInfo/projectInfo';

import Upload from '@/assets/icons/upload.svg?react';
import * as S from '@/pages/addProject/addProject.style';

export default function AddProjectPage() {
  const { projectId } = useParams();
  const { useUploadFile } = useUploadZipFile();
  const { useProjectExtractInfo } = useProjectInfo({ projectId: Number(projectId) });
  const { data, isSuccess } = useProjectExtractInfo;
  const { mutate: uploadZipFile, isError, isSuccess: success } = useUploadFile;
  const zipFileRef = useRef<HTMLInputElement | null>(null);
  const [modal, setModal] = useState(false);
  if (isError) setModal(true);
  const ModalClose = () => {
    setModal(false);
  };
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('application/zip')) {
      return;
    }
    uploadZipFile(
      { projectId: Number(projectId), zipFile: file },
      {
        onSuccess: (res) => {
          console.log('Upload success:', res);
        },
        onError: (err) => {
          console.error('Upload failed:', err);
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
  return success || data?.result.viewType ? (
    <ProjectInfoPage />
  ) : (
    <S.Container>
      {projectId && isSuccess && (
        <S.ProfileWrapper>
          <S.Profile>
            <S.Wrapper>
              <Profile profileImg={data.result.projectImage} />
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
          <Button type="normal" color="blue" icon={<Upload />} iconPosition="left">
            Upload Project File (.zip)
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
    </S.Container>
  );
}
