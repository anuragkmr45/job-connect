// src/components/layout/DashboardLayout.tsx
'use client'

import React, { useState, PropsWithChildren, useEffect } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { usePathname } from 'next/navigation'
import ProtectedLayout from './ProtectedLayout'
// import { Button } from 'antd'
// import { FaRegCommentDots } from 'react-icons/fa'
import ChatWidget from '../ChatWidget'

const TITLES: Record<string, string> = {
  '/main': 'Dashboard',
  '/profile': 'Profile',
  '/search-jobs': 'Search Jobs',
  '/applied-jobs': 'Applied Jobs',
  '/chat-assistant': 'Chat Assistant',
}

export default function DashboardLayout({ children }: PropsWithChildren<{}>) {
  const path = usePathname();
  const title = TITLES[path] ?? 'Dashboard'
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (path === '/main') {
      const showTimer = setTimeout(() => setShowMessage(true), 2000);

      // const hideTimer = setTimeout(() => setShowMessage(false), 5000);

      return () => {
        clearTimeout(showTimer);
        // clearTimeout(hideTimer);
      };
    }
  }, [path]);


  // state for mobile drawer
  // const [drawerOpen, setDrawerOpen] = useState(false)
  // const toggleDrawer = () => setDrawerOpen(o => !o)

  return (
    <ProtectedLayout>
      <div className="flex h-screen">
        {/* Sidebar on md+ */}
        <aside className="hidden lg:block w-64 h-full sticky top-0">
          <Sidebar />
        </aside>

        {/* Mobile Drawer */}
        {/* <Drawer
          // title="Menu"
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          styles={{                         // ✅ new API
            header: { padding: '16px' },    // replaces headerStyle
            body: { padding: 0 }          // replaces bodyStyle
          }}
        >
          <Sidebar />
        </Drawer> */}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Pass toggleDrawer to Header */}
          <Header
            title={title}
            notificationCount={2}
            avatarSrc="/avatar.png"
          />

          <main className="flex-1 overflow-y-auto bg-gray-50 p-6 overscroll-contain">
            {children}
          </main>
          <div className="fixed bottom-6 right-6 w-[450px] max-w-[90vw]">
            {/* Chat widget and welcome message */}
            <div className="flex flex-col rounded-2xl overflow-hidden bg-blue-600 shadow-lg">
              {/* Popup message */}
              {showMessage && (
                <div
                  className={`flex justify-start items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium transform transition-all duration-500 ease-out
                  ${showMessage ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                >
                  <button
                    className="!ml-2 !mr-2 text-white font-bold cursor-pointer"
                    onClick={() => setShowMessage(false)}
                  >
                    ×
                  </button>
                  <span>Hey, I’m your career buddy. How can I help you today?</span>
                </div>

              )}

              {/* Chat Widget */}
              <ChatWidget />
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}
