// components/ProtectedLayout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetProfileQuery } from '@/services/profileService';
import Spinner from '../Spinner';
import { clearAuth } from '@/store/authSlice';

interface Props { children: ReactNode; }

export default function ProtectedLayout({ children }: Props) {
  const token = useAppSelector(s => s.auth.token);
  const [rehydrated, setRehydrated] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => { setRehydrated(true); }, []);

  useEffect(() => {
    if (rehydrated && !token) redirect('/signin');
  }, [rehydrated, token]);

  const { isLoading, error } = useGetProfileQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (rehydrated && error && 'status' in error && error.status === 401) {
      dispatch(clearAuth());
      redirect('/signin');
    }
  }, [error, rehydrated]);

  if (!rehydrated || (token && isLoading)) {
    return <Spinner fullscreen />;
  }

  return <>{children}</>;
}
