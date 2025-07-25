'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistor, store } from '@/store';
import { ToastProvider } from '../Toaster';

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
}
