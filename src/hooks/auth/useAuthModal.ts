import { useState } from 'react';

export function useAuthModal() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return { isAuthModalOpen, setIsAuthModalOpen };
}
