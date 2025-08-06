// src/components/layout/DashboardLayout.tsx
'use client'

import React, { useState, PropsWithChildren } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { usePathname } from 'next/navigation'
import ProtectedLayout from './ProtectedLayout'
import { Button } from 'antd'
import { FaRegCommentDots } from 'react-icons/fa'
import ChatWidget from '../ChatWidget'

const TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/profile': 'Profile',
  '/search-jobs': 'Search Jobs',
  '/applied-jobs': 'Applied Jobs',
  '/chat-assistant': 'Chat Assistant',
}

export default function DashboardLayout({ children }: PropsWithChildren<{}>) {
  const path = usePathname();
  const title = TITLES[path] ?? 'Dashboard'

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
          <ChatWidget />
        </div>
      </div>
    </ProtectedLayout>
  )
}
