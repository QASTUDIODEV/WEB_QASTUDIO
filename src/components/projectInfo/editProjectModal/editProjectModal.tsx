import React, { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { projectModalSchema } from '@/utils/validate';

import { useImage } from '@/hooks/images/useImage';
import { useEditProjects } from '@/hooks/projectInfo/useEditProject';
import useProjectExtractInfo from '@/hooks/projectInfo/useProjectExtractInfo';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import ValidataionMessage from '@/components/common/input/validationMessage';
import ModalLoading from '@/components/common/loading/modalLoading';
import Modal from '@/components/common/modal/modal';
import Profile from '@/components/common/profile/profile';
import * as S from '@/components/projectInfo/editProjectModal/editProjectModal.style';

import Cam from '@/assets/icons/camera.svg?react';
import Delcircle from '@/assets/icons/del_circle.svg?react';

type TProjectModalProps = {
  onClose: () => void;
};
type TFormData = {
  email: string;
  projectName: string;
  projectUrl: string;
  projectImage: string;
};
type TEmailList = {
  email: string;
}[];
export default function EditProjectModal({ onClose }: TProjectModalProps) {
  const { projectId } = useParams();

  const { useGetPresignedUrl, useImageToUploadPresignedUrl } = useImage();
  const { useGetTeamMemberAllEmail, useEditProject } = useEditProjects({ projectId: Number(projectId) });
  const { data: memberEmails } = useGetTeamMemberAllEmail;
  const { data: projectDefaultData } = useProjectExtractInfo(Number(projectId));
  const { mutate: editProject, isPending } = useEditProject;
  const { mutate: getPresignedUrlMutate } = useGetPresignedUrl;
  const { mutate: uploadImageToPresignedUrlMutate } = useImageToUploadPresignedUrl;

  const ImgRef = useRef<HTMLInputElement | null>(null);

  const [keyName, setKeyName] = useState<string>();
  const [memberEmailList, setMemberEmailList] = useState<TEmailList>([]);
  const [imgFile, setImgFile] = useState('');
  const [emails, setEmails] = useState<string[]>(memberEmails?.result.members ?? []);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (memberEmails?.result.members) {
      setMemberEmailList(memberEmails.result.members.map((email) => ({ email })));
    }
  }, [memberEmails]);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    mode: 'onChange',
    resolver: zodResolver(projectModalSchema),
    defaultValues: {
      projectImage: projectDefaultData?.result.projectImage,
      projectName: projectDefaultData?.result.projectName,
      projectUrl: projectDefaultData?.result.projectUrl,
    },
  });
  const email = useRef('');

  const emailValue = useWatch({ control, name: 'email' })?.trim() || '';
  const projectNameValue = useWatch({ control, name: 'projectName' }) || '';
  const projectUrlValue = useWatch({ control, name: 'projectUrl' }) || '';

  useEffect(() => {
    if (emailValue && error) {
      setError(false);
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

  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    editProject(
      {
        projectId: Number(projectId),
        projectImage: keyName ? keyName : projectDefaultData?.result.projectImage?.split('aws.com/')[1] || '',
        projectName: data.projectName,
        projectUrl: data.projectUrl,
        memberEmailList: memberEmailList,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT_MEMBER({ projectId: Number(projectId) }) });
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT_LIST });
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT_INFO({ projectId: Number(projectId) }) });
          setEmails([]);
          onClose();
        },
      },
    );
  };
  const isCreateDisabled = !projectNameValue.trim() || !projectUrlValue.trim() || !!errors.projectName || !!errors.projectUrl || isPending;
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
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
              onSuccess: () => {
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
    <Modal title="Edit Project" onClose={onClose}>
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
            {keyName ? <Profile profileImg={imgFile} isProject={true} /> : <Profile profileImg={projectDefaultData?.result.projectImage} isProject={true} />}
          </S.Preview>
        </S.PostBox>
        <S.PostBox>
          <S.ModalText>Project Name</S.ModalText>
          <Input
            placeholder="Enter project title."
            type="normal"
            errorMessage={errors.projectName?.message}
            touched={!!errors.projectName}
            {...register('projectName')}
          />
          {errors.projectName?.message && <ValidataionMessage message={errors.projectName?.message || ''} isError={!!errors.projectName} />}
        </S.PostBox>
        <S.PostBox>
          <S.ModalText>Project URL</S.ModalText>
          <Input
            type="normal"
            placeholder="Enter the deployed project URL"
            errorMessage={errors.projectUrl?.message}
            touched={!!errors.projectUrl}
            {...register('projectUrl')}
          />
          {errors.projectUrl?.message && <ValidataionMessage message={errors.projectUrl?.message || ''} isError={!!errors.projectUrl} />}
        </S.PostBox>
        <S.PostBox>
          <S.ModalText>Share this project (Optional)</S.ModalText>
          <S.BtnWrapper>
            <Input type="normal" placeholder="Invite others by email" errorMessage={errors.email?.message} touched={!!errors.email} {...register('email')} />
            <Button type="normal" color="blue" onClick={handleAddEmail} disabled={!emailValue.trim() || !!errors.email}>
              Share
            </Button>
          </S.BtnWrapper>
          {errors.email?.message && <ValidataionMessage message={errors.email?.message || ''} isError={!!errors.email} />}
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
          <Button type="normal" color="blue" onClick={handleSubmit(onSubmit)} disabled={isCreateDisabled}>
            Done
          </Button>
        </S.Position>
      </S.ModalBox>
    </Modal>
  );
}
