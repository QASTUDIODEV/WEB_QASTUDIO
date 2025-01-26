import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useImage } from '@/hooks/images/useImage';
import useProjectList from '@/hooks/sidebar/sidebar';
import useTeamMember from '@/hooks/sidebar/useGetTeamMember';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import ValidataionMessage from '@/components/common/input/validationMessage';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/common/sidebar/projectModal/projectModal.style';

import Cam from '@/assets/icons/camera.svg?react';
import Delcircle from '@/assets/icons/del_circle.svg?react';

type TProjectModalProps = {
  onClose: () => void; // 모달 닫기 함수
};

type TFormData = {
  email: string;
  projectName: string;
  projectUrl: string;
};

export default function ProjectModal({ onClose }: TProjectModalProps) {
  const [emails, setEmails] = useState<string[]>([]); // 입력된 이메일 리스트
  const { useGetPresignedUrl } = useImage();
  const { projectId } = useParams();
  const { useAddProject } = useProjectList();
  const { mutate: addProject } = useAddProject;
  const { mutate: getPresignedUrlMutate } = useGetPresignedUrl;
  const ImgRef = useRef<HTMLInputElement | null>(null);
  const [keyName, setKeyName] = useState<string>();

  const {
    control,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm<TFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      projectName: '',
      projectUrl: '',
    },
  });

  const emailValue = watch('email');
  const projectNameValue = watch('projectName');
  const projectUrlValue = watch('projectUrl');

  const handleAddEmail = () => {
    const email = emailValue.trim();
    if (email && !emails.includes(email)) {
      setEmails((prev) => [...prev, email]);
      setValue('email', ''); // 입력 필드 초기화
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails((prev) => prev.filter((email) => email !== emailToRemove));
  };
  const handleCreate = async () => {
    // console.log('Project Name:', projectNameValue); 참고용
    // console.log('Project URL:', projectUrlValue);
    // console.log('Emails:', emails);
    const memberEmailList: { userId: number; email: string }[] = [];
    if (!keyName) {
      alert('Project image is required.');
      return;
    }
    for (const email of emails) {
      const { useGetTeamMember } = await useTeamMember({ projectId: Number(projectId), email }); // 이메일 유효성 확인
      const { data } = useGetTeamMember;
      if (!data) {
        alert('One or more emails include a non-registered user.');
        return; // 유효하지 않은 이메일이 발견되면 함수 종료
      }
      memberEmailList.push(...data.result.userEmails);
    }
    addProject({
      projectImage: keyName,
      projectName: projectNameValue,
      projectUrl: projectUrlValue,
      memberEmailList: memberEmailList,
    });
    onClose(); // 모달 닫기
  };
  const isCreateDisabled = !projectNameValue.trim() || !projectUrlValue.trim() || !!errors.projectName || !!errors.projectUrl || emails.length === 0;
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }
    getPresignedUrlMutate(
      { fileName: file.name },
      {
        onSuccess(data) {
          setKeyName(data.result.keyName);
        },
      },
    );
  };
  console.log(keyName); //성공
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      handleImageUpload(file);
    }
  };
  return (
    <Modal title="Create Project" onClose={onClose}>
      <S.ModalBox>
        <S.ProjectText>Register ongoing project info (Web only).</S.ProjectText>
        <S.PostBox>
          <S.ModalText>Project Image</S.ModalText>
          <label htmlFor="photo">
            <Cam />
          </label>
          <input type="file" id="photo" name="photo" accept="image/*" style={{ display: 'none' }} ref={ImgRef} onChange={(e) => handleInputChange(e)} />
        </S.PostBox>
        <S.PostBox>
          <S.ModalText>Project Name</S.ModalText>
          <Controller
            name="projectName"
            control={control}
            rules={{
              required: 'Project name is required',
              minLength: {
                value: 3,
                message: 'Project name must be at least 3 characters',
              },
            }}
            render={({ field }) => (
              <>
                <Input placeholder="Enter project title." type="nomal" {...field} errorMessage={errors.projectName?.message} touched={!!errors.projectName} />
              </>
            )}
          />
          {touchedFields.projectName && errors.projectName?.message && (
            <ValidataionMessage message={errors.projectName?.message || ''} isError={!!errors.projectName} />
          )}
        </S.PostBox>
        <S.PostBox>
          <S.ModalText>Project URL</S.ModalText>
          <Controller
            name="projectUrl"
            control={control}
            rules={{
              required: 'Project URL is required',
              pattern: {
                value: /^(http|https):\/\/[^ "]+$/,
                message: 'Enter a valid URL',
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  type="nomal"
                  placeholder="Enter the deployed project URL"
                  {...field}
                  errorMessage={errors.projectUrl?.message}
                  touched={!!errors.projectUrl}
                />
              </>
            )}
          />
          {touchedFields.projectUrl && errors.projectUrl?.message && (
            <ValidataionMessage message={errors.projectUrl?.message || ''} isError={!!errors.projectUrl} />
          )}
        </S.PostBox>
        <S.PostBox>
          <S.ModalText>Share this project</S.ModalText>
          <S.BtnWrapper>
            <Controller
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <Input type="nomal" placeholder="Invite others by email" {...field} errorMessage={errors.email?.message} touched={!!errors.email} />
              )}
            />
            <Button type="normal" color="blue" onClick={handleAddEmail} disabled={!emailValue.trim() || emails.includes(emailValue.trim()) || !!errors.email}>
              Share
            </Button>
          </S.BtnWrapper>
          {touchedFields.email && errors.email?.message && <ValidataionMessage message={errors.email?.message || ''} isError={!!errors.email} />}
          <S.tagWrapper>
            {emails.map((email) => (
              <Button key={email} type="tag" color="mint" icon={<Delcircle />} iconPosition="right" onClick={() => handleRemoveEmail(email)}>
                {email}
              </Button>
            ))}
          </S.tagWrapper>
        </S.PostBox>
        <S.Position>
          <Button type="normal" color="blue" onClick={handleCreate} disabled={isCreateDisabled}>
            Create
          </Button>
        </S.Position>
      </S.ModalBox>
    </Modal>
  );
}
