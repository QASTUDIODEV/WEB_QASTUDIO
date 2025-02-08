import { DEVICE, STACK } from '@/enums/enums';

import Button from '@/components/common/button/button';
import ProjectTitle from '@/components/common/projectTitle/projectTitle';

import Goto from '@/assets/icons/arrow_goto.svg?react';
import * as S from '@/pages/projectInfo/projectInfo.style';

type TProjectIntroProps = {
  result:
    | {
        projectId: number;
        projectImage: string;
        projectName: string;
        projectUrl: string;
        introduction: string;
        viewType: string;
        developmentSkill: string;
        assistantId: string;
      }
    | undefined;
};

export default function ProjectIntro({ result }: TProjectIntroProps) {
  const type = DEVICE[result?.viewType as keyof typeof DEVICE] ?? DEVICE.PC;
  const stack = STACK[result?.developmentSkill as keyof typeof STACK] ?? STACK.NEXT;
  return (
    <S.Profile>
      <ProjectTitle title={result?.projectName} profileImg={result?.projectImage} stack={stack} device={type} />
      <S.Wrapper top="7.2px" right="0" className="buttonShow">
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
