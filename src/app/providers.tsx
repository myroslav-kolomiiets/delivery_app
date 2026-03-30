'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { SnackbarProvider } from 'notistack';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </Provider>
  );
}
