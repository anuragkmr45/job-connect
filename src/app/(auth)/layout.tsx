'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export default function AuthLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const token = useAppSelector(s => s.auth.token);

    useEffect(() => {
        if (token) {
            router.replace('/');   // already signed in → go to dashboard
        }
    }, [token, router]);

    return <>{children}</>;
}
