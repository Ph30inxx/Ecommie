'use client'

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query/queryClient';

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
