import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import useUploadZipFile from '@/hooks/projectInfo/projectInfo';

import Button from '@/components/common/button/button';

import Upload from '@/assets/icons/upload.svg?react';
import * as S from '@/pages/addProject/addProject.style';

export default function AddProjectPage() {
  const { projectId } = useParams();
  const { useUploadFile } = useUploadZipFile();
  const { mutate: uploadZipFile } = useUploadFile;
  const zipFileRef = useRef<HTMLInputElement | null>(null);
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
  return (
    <S.Container>
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
    </S.Container>
  );
}
