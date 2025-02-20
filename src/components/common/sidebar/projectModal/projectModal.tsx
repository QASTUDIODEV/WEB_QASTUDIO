import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { useImage } from '@/hooks/images/useImage';
import useProjectList from '@/hooks/sidebar/sidebar';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import ValidataionMessage from '@/components/common/input/validationMessage';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/common/sidebar/projectModal/projectModal.style';
import ProjectProfile from '@/components/common/sidebar/projectProfile/projectProfile';

import ModalLoading from '../../loading/modalLoading';

import Cam from '@/assets/icons/camera.svg?react';
import Delcircle from '@/assets/icons/del_circle.svg?react';

type TProjectModalProps = {
  onClose: () => void;
};
type TFormData = {
  email: string;
  projectName: string;
  projectUrl: string;
};
type TEmailList = {
  email: string;
}[];
export default function ProjectModal({ onClose }: TProjectModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string | null | undefined>('');
  const { useGetPresignedUrl, useImageToUploadPresignedUrl } = useImage();
  const { useAddProject } = useProjectList();
  const { mutate: addProject, isPending } = useAddProject;
  const { mutate: getPresignedUrlMutate } = useGetPresignedUrl;
  const ImgRef = useRef<HTMLInputElement | null>(null);
  const [keyName, setKeyName] = useState<string>();
  const [memberEmailList, setMemberEmailList] = useState<TEmailList>([]);
  const [imgFile, setImgFile] = useState('');
  const queryClient = useQueryClient();
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<TFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      projectName: '',
      projectUrl: '',
    },
  });
  const email = useRef('');
  const emailValue = useWatch({ control, name: 'email' })?.trim() || '';
  const projectNameValue = useWatch({ control, name: 'projectName' }) || '';
  const projectUrlValue = useWatch({ control, name: 'projectUrl' }) || '';
  const { mutate: uploadImageToPresignedUrlMutate } = useImageToUploadPresignedUrl;
  let isImg: boolean = true;
  const [error, setError] = useState(false);
  useEffect(() => {
    if (emailValue && (error || emailErrorMsg)) {
      setError(false);
      setEmailErrorMsg(null);
    }
  }, [emailValue]);

  const handleAddEmail = () => {
    email.current = emailValue;
    let isDuplicate = emails.includes(email.current);
    if (isDuplicate) {
      setError(true);
      setValue('email', '');
      isDuplicate = false;
      return;
    } else {
      setEmails((prev) => [...prev, email.current]);
      setMemberEmailList((prev) => [...prev, { email: email.current }]);
      setValue('email', '');
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails((prev) => prev.filter((e) => e !== emailToRemove));
    setMemberEmailList((prev) => prev.filter((e) => e.email !== emailToRemove));
  };
  const handleCreate = async () => {
    addProject(
      {
        projectImage: keyName,
        projectName: projectNameValue,
        projectUrl: projectUrlValue,
        memberEmailList: memberEmailList,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getProjectList'] });
          setEmails([]);
          onClose();
        },
        onError: (err) => {
          setEmailErrorMsg(err.response?.data.message);
          setEmails([]);
        },
      },
    );
  };
  const isCreateDisabled = !projectNameValue.trim() || !projectUrlValue.trim() || !!errors.projectName || !!errors.projectUrl || isPending;
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      isImg = false;
      return;
    }
    getPresignedUrlMutate(
      { fileName: file.name },
      {
        onSuccess(img) {
          isImg = true;
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
              },
            },
          );
        },
      },
    );
  };
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      handleImageUpload(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result as string);
      };
    }
  };

  return (
    <Modal title="Create Project" onClose={onClose}>
      {isPending && <ModalLoading />}
      <S.ModalBox>
        <S.ProjectText>Register ongoing project info (Web only).</S.ProjectText>
        <S.PostBox>
          <S.ModalText>Project Image (Optional)</S.ModalText>
          <S.Preview>
            <label htmlFor="photo">
              <Cam style={{ cursor: 'pointer' }} />
            </label>
            <input type="file" id="photo" name="photo" accept="image/*" style={{ display: 'none' }} ref={ImgRef} onChange={(e) => handleInputChange(e)} />
            <ProjectProfile profileImg={imgFile} />
          </S.Preview>
          {!isImg && <ValidataionMessage message={'Only image is allowed'} isError={isImg} />}
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
          {errors.projectName?.message && <ValidataionMessage message={errors.projectName?.message || ''} isError={!!errors.projectName} />}
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
          {errors.projectUrl?.message && <ValidataionMessage message={errors.projectUrl?.message || ''} isError={!!errors.projectUrl} />}
        </S.PostBox>
        <S.PostBox>
          <S.ModalText>Share this project (Optional)</S.ModalText>
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
            <Button type="normal" color="blue" onClick={handleAddEmail} disabled={!emailValue.trim() || !!errors.email}>
              Share
            </Button>
          </S.BtnWrapper>
          {(emailErrorMsg || errors.email?.message) && (
            <ValidataionMessage message={errors.email?.message ?? emailErrorMsg ?? ''} isError={!!(emailErrorMsg || errors.email)} />
          )}

          {!errors.email?.message && error && <ValidataionMessage message={'The user is already added to the project.'} isError={!!error} />}
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
