import { type MutationFunction, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { TUseMutationCustomAIOptions } from '@/types/scenario/scenario';

export function useCoreAIMutation<T, U>(mutation: MutationFunction<T, U>, options?: TUseMutationCustomAIOptions) {
  return useMutation({
    mutationFn: mutation,
    onError: (error) => {
      toast.error(error.response?.data.detail || 'An error occurred.');
    },
    ...options,
  });
}
