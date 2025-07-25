import React, { createContext, useContext } from 'react';
import { message } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';

interface ToastContextProps {
  toast: MessageInstance;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

/**
 * Provider that injects Antd message API into React context
 */
export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [api, contextHolder] = message.useMessage();

  return (
    <ToastContext.Provider value={{ toast: api }}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Custom hook to access toast functions
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx.toast;
}
