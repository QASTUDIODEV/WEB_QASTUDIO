import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux.ts';

import Modal from '@/components/common/modal/modal.tsx';

import * as S from '@/pages/dashboard/dashboard.style';
import { setOpen } from '@/slices/modalSlice.ts';

export default function DashboardPage() {
  const { isOpen } = useSelector((state) => state);
  const dispatch = useDispatch();

  /*예시 모달*/
  return (
    <S.Container>
      <button onClick={() => dispatch(setOpen())}>클릭</button>
      {isOpen && (
        <Modal title={'UMC_PM_DAY'} onClose={() => dispatch(setOpen())}>
          <S.Flex>
            <div>
              Define users for the registered project.
              <br />
              QASTUDIO will create a suitable scenario for you.
            </div>
            <button onClick={() => {}}>테스트</button>
          </S.Flex>
        </Modal>
      )}
    </S.Container>
  );
}
