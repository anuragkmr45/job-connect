// components/AuthLayout.tsx
import { ReactNode } from 'react';
import Image from 'next/image';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <div
    className="flex items-center justify-center min-h-screen bg-cover bg-center p-6"
    style={{ backgroundImage: "url('/tank.png')" }}
  >
    {/* Optional: Dark overlay for better readability of content */}
    <div className="absolute inset-0 bg-black/60 z-0"></div>

    {/* Content Container - centered and styled as a floating card */}
    <div className="relative z-10 w-full max-w-lg mx-auto p-8 rounded-2xl backdrop-filter backdrop-blur-md bg-white/10 border border-gray-700 shadow-2xl">
      {/* If you still want the JobConnect logo/title, you can uncomment and adjust this */}
      {/*
      <div className='flex items-center justify-center space-x-4 mb-8'>
        <Image src="https://res.cloudinary.com/dkwptotbs/image/upload/v1751692517/job-connect_lhcl0l.png" alt="Job Connect" width={50} height={40} />
        <h1 className="text-3xl font-bold tracking-tight text-white">JobConnect</h1>
      </div>
      */}
      {children}
    </div>
  </div>
);

export default AuthLayout;