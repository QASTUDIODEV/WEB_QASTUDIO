import React from 'react';

// 아이콘 반환 함수
export function getIcon<T extends string>(map: Record<T, React.FunctionComponent | null>, key: T): React.ReactNode {
  const Icon = map[key];
  return Icon ? React.createElement(Icon) : null;
}

/* 사용예시:
const iconMap = {
  [ACTION_STATE.SUCCESS]: CheckCircle,
  [ACTION_STATE.ERROR]: FailCircle,
  [ACTION_STATE.UNVERIFIED]: null, 
};
getIcon(iconMap, action.state) */
