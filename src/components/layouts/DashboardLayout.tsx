"use client"

// src/components/layout/DashboardLayout.tsx
import React, { PropsWithChildren } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { usePathname } from 'next/navigation'

type Props = PropsWithChildren<{ }>

const TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/profile': 'Profile',
  '/search-jobs': 'Search Jobs',
  '/applied-jobs': 'Applied Jobs',
  '/chat-assistant': 'Chat Assistant',
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const path = usePathname()
  const title = TITLES[path] ?? 'Dashboard'

  return (
    // 1) Make the flex container exactly viewport‐height:
    <div className="flex h-screen">
      {/* 2) Sidebar is full height + sticky */}
      <aside className="w-64 hidden lg:block h-full sticky top-0">
        <Sidebar />
      </aside>

      {/* 3) Main: flex column, header fixed, content scrolls */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} notificationCount={2} avatarSrc="/avatar.png" />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
