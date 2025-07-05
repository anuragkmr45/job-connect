// components/Spinner.tsx
'use client';

import React from 'react';

interface SpinnerProps {
  /** if true, covers the whole screen */
  fullscreen?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ fullscreen = false }) => {
  const wrapperClass = fullscreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/75 z-50'
    : 'flex items-center justify-center';

  return (
    <div className={wrapperClass}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
    </div>
  );
};

export default Spinner;
