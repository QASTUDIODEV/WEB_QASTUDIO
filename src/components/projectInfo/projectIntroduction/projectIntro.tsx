import type { TInfoDTO } from '@/types/projectInfo/projectInfo';
import { DEVICE, STACK } from '@/enums/enums';

import Button from '@/components/common/button/button';
import ProjectTitle from '@/components/common/projectTitle/projectTitle';
import * as S from '@/components/projectInfo/projectIntroduction/projectIntro.style';

import Goto from '@/assets/icons/arrow_goto.svg?react';

export default function ProjectIntro({ result }: TInfoDTO) {
  const type = DEVICE[result?.viewType as keyof typeof DEVICE] ?? DEVICE.PC;
  const stack = STACK[result?.developmentSkill as keyof typeof STACK] ?? STACK.NEXT;
  return (
    <S.Profile>
      <ProjectTitle title={result?.projectName} profileImg={result?.projectImage} stack={stack} device={type} />
      <S.Wrapper className="buttonShow">
        <Button
          type="normal"
          color="default"
          icon={<Goto />}
          iconPosition="right"
          onClick={() => {
            if (result?.projectUrl) {
              window.location.href = result.projectUrl;
            }
          }}
        >
          Go to Site
        </Button>
      </S.Wrapper>
    </S.Profile>
  );
}
