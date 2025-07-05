// "use client"

// // src/components/layout/DashboardLayout.tsx
// import React, { PropsWithChildren } from 'react'
// import Sidebar from '../Sidebar'
// import Header from '../Header'
// import { usePathname } from 'next/navigation'
// import ProtectedLayout from './ProtectedLayout'

// type Props = PropsWithChildren<{ }>

// const TITLES: Record<string, string> = {
//   '/': 'Dashboard',
//   '/profile': 'Profile',
//   '/search-jobs': 'Search Jobs',
//   '/applied-jobs': 'Applied Jobs',
//   '/chat-assistant': 'Chat Assistant',
// }

// const DashboardLayout: React.FC<Props> = ({ children }) => {
//   const path = usePathname()
//   const title = TITLES[path] ?? 'Dashboard'

//   return (
//     <ProtectedLayout>
//     <div className="flex h-screen">
//       {/* 2) Sidebar is full height + sticky */}
//       <aside className="w-64 hidden lg:block h-full sticky top-0">
//         <Sidebar />
//       </aside>


//       {/* 3) Main: flex column, header fixed, content scrolls */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header title={title} notificationCount={2} avatarSrc="/avatar.png" />

//         <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//     </ProtectedLayout>
//   )
// }

// export default DashboardLayout

// src/components/layout/DashboardLayout.tsx
'use client'

import React, { useState, PropsWithChildren } from 'react'
import { Drawer } from 'antd'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { usePathname } from 'next/navigation'
import ProtectedLayout from './ProtectedLayout'

const TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/profile': 'Profile',
  '/search-jobs': 'Search Jobs',
  '/applied-jobs': 'Applied Jobs',
  '/chat-assistant': 'Chat Assistant',
}

export default function DashboardLayout({ children }: PropsWithChildren<{}>) {
  const path = usePathname()
  const title = TITLES[path] ?? 'Dashboard'

  // state for mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen(o => !o)

  return (
    <ProtectedLayout>
      <div className="flex h-screen">
        {/* Sidebar on md+ */}
        <aside className="hidden lg:block w-64 h-full sticky top-0">
          <Sidebar />
        </aside>

        {/* Mobile Drawer */}
        <Drawer
          // title="Menu"
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          bodyStyle={{ padding: 0 }}
          headerStyle={{ padding: '16px' }}
        >
          <Sidebar />
        </Drawer>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Pass toggleDrawer to Header */}
          <Header
            title={title}
            notificationCount={2}
            avatarSrc="/avatar.png"
            onAvatarClick={toggleDrawer}
          />

          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedLayout>
  )
}
