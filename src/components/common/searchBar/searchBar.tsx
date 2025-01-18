import React from 'react';

import * as S from './searchBar.style';

import SearchIcon from '@/assets/icons/search.svg?react';

type TSearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function SearchBar({ ...props }: TSearchBarProps) {
  return (
    <S.Container>
      <input type="text" {...props} />
      <SearchIcon width={'14px'} height={'14px'} />
    </S.Container>
  );
}
