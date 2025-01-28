import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import useDebounce from '@/hooks/common/useDebounce';
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
  projectLength: number | undefined;
  onClose: () => void; // 모달 닫기 함수
};
type TFormData = {
  email: string;
  projectName: string;
  projectUrl: string;
};
type TEmailList = {
  userId: number;
  email: string;
}[];
export default function ProjectModal({ projectLength, onClose }: TProjectModalProps) {
  let projectId = 0;
  if (projectLength) {
    projectId = projectLength;
  }
  const [emails, setEmails] = useState<string[]>([]); // 입력된 이메일 리스트
  const { useGetPresignedUrl, useImageToUploadPresignedUrl } = useImage();
  const { useAddProject } = useProjectList();
  const { mutate: addProject } = useAddProject;
  const { mutate: getPresignedUrlMutate } = useGetPresignedUrl;
  const ImgRef = useRef<HTMLInputElement | null>(null);
  const [keyName, setKeyName] = useState<string>();
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [memberEmailList, setMemberEmailList] = useState<TEmailList>([]);

  const queryClient = useQueryClient();
  const {
    control,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<TFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      projectName: '',
      projectUrl: '',
    },
  });
  const emailValue = useWatch({ control, name: 'email' })?.trim() || '';
  const debouncedEmail = useDebounce(emailValue, 800);
  const projectNameValue = useWatch({ control, name: 'projectName' }) || '';
  const debouncedProjectName = useDebounce(projectNameValue, 500);
  const projectUrlValue = useWatch({ control, name: 'projectUrl' }) || '';
  const debouncedProjectUrl = useDebounce(projectUrlValue, 500);
  const { useGetTeamMember } = useTeamMember({ projectId: projectId, email: debouncedEmail }); // 이메일 유효성 확인
  const { mutate: uploadImageToPresignedUrlMutate } = useImageToUploadPresignedUrl;

  const { data } = useGetTeamMember;
  useEffect(() => {
    if (data && data.result.userEmails.some((userEmail) => userEmail.email === debouncedEmail)) {
      const existingEmails = memberEmailList.map((member) => member.email);
      const newEmails = data.result.userEmails.filter((userEmail) => userEmail.email === debouncedEmail && !existingEmails.includes(userEmail.email));

      if (newEmails.length > 0) {
        setMemberEmailList((prev) => [...prev, ...newEmails]); // 유효한 이메일만 추가
        setIsEmailValid(true); // 이메일 유효성 상태 업데이트
      }
    } else {
      setIsEmailValid(false); // 이메일이 유효하지 않음
    }
  }, [data, debouncedEmail]);

  const handleAddEmail = () => {
    if (!debouncedEmail || emails.includes(debouncedEmail)) {
      return; // 이메일이 비어 있거나 이미 추가된 경우
    }

    if (!isEmailValid) {
      setValue('email', '');
      return; // 유효하지 않은 이메일이면 추가하지 않음
    }

    setEmails((prev) => [...prev, debouncedEmail]); // 이메일 추가
    setValue('email', ''); // 입력 필드 초기화
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails((prev) => prev.filter((e) => e !== emailToRemove));
  };
  const handleCreate = async () => {
    if (!keyName) {
      alert('Project image is required.');
      return;
    }
    addProject(
      {
        projectImage: keyName,
        projectName: debouncedProjectName,
        projectUrl: debouncedProjectUrl,
        memberEmailList: memberEmailList,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getProjectList'] });
          onClose(); // 모달 닫기
        },
      },
    );
  };
  const isCreateDisabled = !debouncedProjectName.trim() || !debouncedProjectUrl.trim() || !!errors.projectName || !!errors.projectUrl || emails.length === 0;
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }
    getPresignedUrlMutate(
      { fileName: file.name },
      {
        onSuccess(img) {
          uploadImageToPresignedUrlMutate(
            {
              url: img.result.url,
              file: file,
            },
            {
              onSuccess: (res) => {
                console.log(res);
                setKeyName(img.result.keyName);
              },
              onError: (err) => {
                console.error('Image upload failed:', err);
                alert('이미지 업로드에 실패했습니다.');
              },
            },
          );
        },
      },
    );
  };
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
                <Input placeholder="Enter project title." type="normal" {...field} errorMessage={errors.projectName?.message} touched={!!errors.projectName} />
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
                  type="normal"
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
                <Input type="normal" placeholder="Invite others by email" {...field} errorMessage={errors.email?.message} touched={!!errors.email} />
              )}
            />
            <Button type="normal" color="blue" onClick={handleAddEmail} disabled={!emailValue.trim() || emails.includes(emailValue.trim()) || !!errors.email}>
              Share
            </Button>
          </S.BtnWrapper>
          {touchedFields.email && errors.email?.message && <ValidataionMessage message={errors.email?.message || ''} isError={!!errors.email} />}
          {!isEmailValid && emailValue && <ValidataionMessage message={'This email is either unregistered or already added.'} isError={!isEmailValid} />}
          <S.tagWrapper>
            {emails.map((em) => (
              <Button key={em} type="tag" color="mint" icon={<Delcircle />} iconPosition="right" onClick={() => handleRemoveEmail(em)}>
                {em}
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
