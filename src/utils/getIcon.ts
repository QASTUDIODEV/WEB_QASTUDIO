import React from 'react';

// 아이콘 반환 함수
export function getIcon<T extends string>(map: Record<T, React.FunctionComponent | null>, key: T): React.ReactNode {
  const Icon = map[key];
  return Icon ? React.createElement(Icon) : null;
}

// getIcon(deviceIconMap, device)
