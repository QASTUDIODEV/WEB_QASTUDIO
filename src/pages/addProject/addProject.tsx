import Button from '@/components/common/button/button';

import Upload from '@/assets/icons/upload.svg?react';
import * as S from '@/pages/addProject/addProject.style';

export default function AddProjectPage() {
  return (
    <S.Container>
      <S.Title>Add Project File</S.Title>
      <S.Text>
        Please enter the project folder for AI to understand the project. <br />
        Please compress and enter the React JS/TS file.
      </S.Text>
      <Button type="normal" color="blue" icon={<Upload />} iconPosition="left">
        Upload Project File (.zip)
      </Button>
    </S.Container>
  );
}
