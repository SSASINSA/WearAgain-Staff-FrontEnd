import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RootNavigation from './src/navigation/RootNavigation';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}

export default App;
