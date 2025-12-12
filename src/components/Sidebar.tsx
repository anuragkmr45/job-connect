"use client"

import React from 'react'
import { Button } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiSearch, FiBookmark, FiMessageSquare } from 'react-icons/fi'
import Image from 'next/image'
import { useLogout } from '@/hooks/useLogout'

interface SidebarItem {
  key: string
  label: string
  icon: React.ReactNode
  href: string
}

const ITEMS: SidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <FiSearch />, href: '/main' },
  { key: 'profile', label: 'Profile', icon: <FiBookmark />, href: '/profile' },
  { key: 'searchjobs', label: 'Search Jobs', icon: <FiMessageSquare />, href: '/search-jobs' },
  { key: 'appliedjobs', label: 'Applied Jobs', icon: <FiMessageSquare />, href: '/applied-jobs' },
  // { key: 'chatassistant', label: 'Chat Assistant', icon: <FiMessageSquare />, href: '/chat-assistant' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useLogout()

  // pick the matching item by URL:
  const activeKey =
    ITEMS.find(item => pathname === item.href)?.key
    // fallback if you have dynamic routes etc:
    || ITEMS.find(item => pathname.startsWith(item.href))?.key
    || ITEMS[0].key

  return (
    <div className="flex flex-col h-screen bg-[#1677ff] !text-white">
      {/* header */}
      <Link href='/main' className="flex items-center px-6 py-4 space-x-3 cursor-pointer">
        <Image src="https://res.cloudinary.com/dkwptotbs/image/upload/v1751692517/job-connect_lhcl0l.png" alt="JobConnect" width={40} height={40} />
        <div>
          <h1 className="text-lg font-semibold">JobConnect</h1>
          <p className="text-xs text-[#eee4e4]">Military Career Portal</p>
        </div>
      </Link>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {ITEMS.map(item => {
          const isActive = item.key === activeKey
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`
                flex items-center px-4 py-3 rounded-lg
                transition-all duration-200 ease-in-out
                ${isActive
                  ? 'bg-[#82aafa] text-amber-50 shadow-md'
                  : 'text-gray-300 hover:bg-[#82aafa] hover:shadow-sm'}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="ml-3">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* footer */}
      <div className="px-6 py-4 text-xs text-gray-500">
        {/* Serving Those Who Served */}
        <Button type="default" className='bg-red-900 text-white w-full' onClick={logout}>
          Log out
        </Button>
      </div>
    </div>
  )
}
