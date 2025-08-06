'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetProfileQuery } from '@/services/profileService';
import { clearAuth } from '@/store/authSlice';
import Spinner from '@/components/Spinner';
import { Button } from 'antd';

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
      router.replace('/signin');
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
      router.replace('/signin');
    }
  }, [ready, error, dispatch, router]);

  // 5) Show spinner until checks complete
  if (!ready || (token && isLoading)) {
    return <Spinner fullscreen />;
  }

  if (!token) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">Not authorised</p>
        <Button type='link' size='large' onClick={() => router.push('/signin')}>Go to sign-in</Button>
      </div>
    );
  }

  // 6) All good → render protected children
  return <>{children}</>;
}
