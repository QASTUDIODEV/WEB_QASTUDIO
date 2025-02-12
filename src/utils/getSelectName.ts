import { TEST_STATE } from '@/enums/enums';

export const getSelectName = (type: TEST_STATE) => {
  switch (type) {
    case TEST_STATE.ALL:
      return 'All';
    case TEST_STATE.SUCCESS:
      return 'Success';
    case TEST_STATE.FAIL:
      return 'Fail';
    default:
      return 'Fail';
  }
};
