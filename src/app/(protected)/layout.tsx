'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetProfileQuery } from '@/services/profileService';
import { clearAuth } from '@/store/authSlice';
import Spinner from '@/components/Spinner';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(s => s.auth.token);
  const [ready, setReady] = useState(false);

  // 1) Wait for redux-persist to rehydrate
  useEffect(() => {
    setReady(true);
  }, []);

  // 2) If no token, send to signin
  useEffect(() => {
    if (ready && !token) {
      router.replace('/auth/signin');
    }
  }, [ready, token, router]);

  // 3) Verify token by fetching profile
  const { isLoading, error } = useGetProfileQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true
  });

  // 4) On 401, clear auth & redirect
  useEffect(() => {
    if (ready && error && 'status' in error && error.status === 401) {
      dispatch(clearAuth());
      router.replace('/auth/signin');
    }
  }, [ready, error, dispatch, router]);

  // 5) Show spinner until checks complete
  if (!ready || (token && isLoading)) {
    return <Spinner fullscreen />;
  }

  // 6) All good → render protected children
  return <>{children}</>;
}
