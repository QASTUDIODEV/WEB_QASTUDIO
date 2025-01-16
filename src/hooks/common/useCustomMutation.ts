import { useMutation } from '@tanstack/react-query';

import type { TResponseError } from '@/types/common/common';

interface IUseCustomMutationParams<TVariables, TResponse> {
  mutationFn: (variables: TVariables) => Promise<TResponse>;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: TResponseError) => void;
}

export function useCustomMutation<TVariables, TResponse>({ mutationFn, onSuccess, onError }: IUseCustomMutationParams<TVariables, TResponse>) {
  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  return { mutate, isPending };
}
