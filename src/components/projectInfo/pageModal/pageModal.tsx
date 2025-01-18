import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';
import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import Modal from '@/components/common/modal/modal';
import Dropdown from '@/components/projectInfo/dropDown/dropDown';
import * as S from '@/components/projectInfo/pageModal/pageModal.style';

import Plus from '@/assets/icons/add.svg?react';
import PlusDark from '@/assets/icons/add_dark.svg?react';
import DelCircle from '@/assets/icons/del_circle.svg?react';

type TCreatePageModalProps = {
  onClose: () => void; // 모달 닫기 함수
};
type TFormData = {
  pageName: string;
  pageDescription: string;
  pagePath: string;
  accessControl: string[];
  scenarios: { value: string }[];
};
export default function CreatePageModal({ onClose }: TCreatePageModalProps) {
  const [options, setOptions] = useState<string[]>(['origin', 'admin', 'guest']);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [modalStep, setModalStep] = useState(1); // 모달 단계 상태 (1: 역할 선택, 2: 역할 확인)

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, touchedFields },
  } = useForm<TFormData>({
    mode: 'onChange', // 실시간으로 상태를 업데이트
    defaultValues: {
      pageName: '',
      pageDescription: '',
      pagePath: '',
      accessControl: [],
      scenarios: [{ value: '' }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'scenarios', // 필드 배열 이름
  });
  const onSubmit = () => {
    // console.log('Form Submitted:', data);
    setModalStep(2); // 다음 단계로 이동
  };

  // 선택된 옵션 추가 함수
  const handleSelect = (value: string) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions((prev) => [...prev, value]);
    }
  };
  const handleCreate = () => {
    // const scenarios = getValues('scenarios'); 나중에 활용 예정
    // console.log('Scenarios:', scenarios);
    onClose(); // 모달 닫기
  };
  // 선택된 옵션 제거 함수
  const handleRemove = (value: string) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== value));
  };
  return (
    <Modal title={`Create New Page ${modalStep}/2`} onClose={onClose}>
      {modalStep === 1 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.ModalBox>
            {/* Page Name */}
            <S.PostBox>
              <S.ModalText>Page Name</S.ModalText>
              <Controller
                name="pageName"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Page Name is required',
                  },
                  minLength: {
                    value: 3,
                    message: 'Page Name must be at least 3 characters',
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input placeholder="Enter page name to add." type="normal" {...field} errorMessage={errors.pageName?.message} touched={!!errors.pageName} />
                    {touchedFields.pageName && errors.pageName?.message && (
                      <ValidataionMessage message={errors.pageName?.message || ''} isError={!!errors.pageName} />
                    )}
                  </>
                )}
              />
            </S.PostBox>

            {/* Page Description */}
            <S.PostBox>
              <S.ModalText>Page Description</S.ModalText>
              <Controller
                name="pageDescription"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Page Description is required',
                  },
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters',
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      placeholder="Describe the page role."
                      type="normal"
                      {...field}
                      errorMessage={errors.pageDescription?.message}
                      touched={!!errors.pageDescription}
                    />
                    {touchedFields.pageDescription && errors.pageDescription?.message && (
                      <ValidataionMessage message={errors.pageDescription?.message || ''} isError={!!errors.pageDescription} />
                    )}
                  </>
                )}
              />
            </S.PostBox>

            {/* Page Path */}
            <S.PostBox>
              <S.ModalText>Page Path</S.ModalText>
              <Controller
                name="pagePath"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Page Path is required',
                  },
                  pattern: {
                    value: /^\/([a-zA-Z0-9-_]+)?$/,
                    message: 'Path must start with / and contain valid characters',
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input placeholder="Enter the page path." type="normal" {...field} errorMessage={errors.pagePath?.message} touched={!!errors.pagePath} />
                    {touchedFields.pagePath && errors.pagePath?.message && (
                      <ValidataionMessage message={errors.pagePath?.message || ''} isError={!!errors.pagePath} />
                    )}
                  </>
                )}
              />
            </S.PostBox>
            {/* Page Path */}
            <S.PostBox>
              <S.ModalText>Access Control</S.ModalText>
              <Dropdown options={options} onSelect={handleSelect} placeholder="Select roles for page access." />
            </S.PostBox>
            {/* Next Button */}
            <S.PostBox>
              <S.BtnWrapper>
                {selectedOptions.map((option) => (
                  <Button key={option} type="tag" color="mint" icon={<DelCircle />} iconPosition="right" onClick={() => handleRemove(option)}>
                    {option}
                  </Button>
                ))}
              </S.BtnWrapper>
              <S.Position>
                <Button
                  type="normal"
                  color="blue"
                  disabled={!isValid} // 모든 필드가 유효하지 않으면 비활성화
                >
                  Next
                </Button>
              </S.Position>
            </S.PostBox>
          </S.ModalBox>
        </form>
      ) : (
        <S.ModalBox>
          {/* Scenarios */}
          <S.PostBox>
            <S.ModalText>Main Scenario</S.ModalText>
            <S.ModalText2>
              Describe the user experience that represents the page in detail.
              <br />
              The more specific and descriptive the scenario, the better.
            </S.ModalText2>
            {fields.map((field, index) => (
              <>
                <S.InputWrapper key={field.id}>
                  <Controller
                    name={`scenarios.${index}.value`}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Scenario is required',
                      },
                      minLength: {
                        value: 3,
                        message: 'Write at least 3 characters.',
                      },
                    }}
                    render={({ field: controllerField }) => (
                      <S.InputWrapper>
                        <Input
                          placeholder="Enter scenario details."
                          type="normal"
                          {...controllerField}
                          errorMessage={errors.scenarios?.[index]?.value?.message}
                          touched={!!errors.scenarios?.[index]}
                        />
                        <S.ClearButton>
                          <DelCircle
                            onClick={() => {
                              setValue(`scenarios.${index}.value`, '', { shouldValidate: true });
                            }}
                          />
                        </S.ClearButton>
                      </S.InputWrapper>
                    )}
                  />
                </S.InputWrapper>
                {touchedFields.scenarios?.[index]?.value && errors.scenarios?.[index]?.value?.message && (
                  <ValidataionMessage message={errors.scenarios?.[index]?.value?.message || ''} isError={!!errors.scenarios?.[index]?.value} />
                )}
              </>
            ))}
            <S.Btn
              disabled={
                !fields[fields.length - 1] || !getValues(`scenarios.${fields.length - 1}.value`) || getValues(`scenarios.${fields.length - 1}.value`).length < 3
              }
              onClick={() => append({ value: '' })} // 새로운 필드 추가
            >
              {!fields[fields.length - 1] ||
              !getValues(`scenarios.${fields.length - 1}.value`) ||
              getValues(`scenarios.${fields.length - 1}.value`).length < 3 ? (
                <PlusDark />
              ) : (
                <Plus />
              )}
            </S.Btn>
          </S.PostBox>
          <S.Position2>
            <Button type="normal" color="blue" disabled={!isValid} onClick={handleCreate}>
              Create
            </Button>
          </S.Position2>
        </S.ModalBox>
      )}
    </Modal>
  );
}
