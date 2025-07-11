'use client'

import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import CustomCarousel from '@/components/CustomCarousel'
import { Input } from 'antd'
import {
  HiSearch,
  HiOutlineUserCircle,
  HiClipboardList,
  HiCalendar,
  HiOutlineDownload,
  HiChat,
} from 'react-icons/hi'
import CardLayout from '@/components/layouts/CardLayout'

const messages = [
  {
    from: 'bot' as const,
    text: `Welcome to your AI Career Assistant! I’m standing by to help with your mission objectives. How can I assist you today?`,
    time: '11:23 PM',
  },
  // add more messages here as needed…
]

const quickActions = [
  'Find jobs near me',
  'Show saved jobs',
  'Update my profile',
  'Download applications',
  'Show interview schedule',
  'Check application status',
  'Career guidance',
].map((label) => ({ label }))

const helpItems = [
  { icon: HiSearch, text: 'Job Recommendations' },
  { icon: HiOutlineUserCircle, text: 'Profile Analysis' },
  { icon: HiClipboardList, text: 'Application Status' },
  { icon: HiCalendar, text: 'Interview Scheduling' },
  { icon: HiOutlineDownload, text: 'Document Export' },
  { icon: HiChat, text: 'Career Guidance' },
]

const recentConvos = [
  { title: 'Job search strategy', time: 'Today, 2:30 PM' },
  { title: 'Resume optimization', time: 'Yesterday, 4:15 PM' },
  { title: 'Interview preparation', time: 'Dec 26, 1:20 PM' },
]

export default function Chatassistant() {
  return (
    <DashboardLayout>
      <div className="bg-gray-100 grid grid-cols-6 gap-4">
        {/* ── Chat Column ─────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col col-span-4">
          <CardLayout bordered className="flex-1 flex flex-col justify-between h-screen">
            {/* Chat messages */}
            <div className="overflow-auto space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'
                    }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${m.from === 'bot'
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-blue-600 text-white'
                      }`}
                  >
                    <p>{m.text}</p>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {m.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className=''>

              {/* Quick-action carousel */}
              <div className="px-6">
                <CustomCarousel
                  slidesToShow={4}
                  arrows
                  arrowPosition="center-right"
                  className="py-2"
                >
                  {quickActions.map((act) => (
                    <button
                      key={act.label}
                      onClick={() => { }}
                      className="mx-2 px-4 py-2 bg-white border rounded-full hover:bg-gray-50 text-xs whitespace-nowrap"
                    >
                      <span className='text-xs'>{act.label}</span>
                    </button>
                  ))}
                </CustomCarousel>
              </div>

              {/* Chat input */}
              <div className="px-6 py-4 border-t border-gray-200">
                <Input
                  placeholder="Type a message or ask for help…"
                  size="large"
                  bordered
                />
              </div>
            </div>
          </CardLayout>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <div className="w-80 p-4 flex flex-col space-y-4 col-span-2">
          <CardLayout
            header={<h3 className="text-lg font-semibold">What I Can Help You With</h3>}
            bordered
          >
            <div className="space-y-2">
              {helpItems.map((it) => (
                <div
                  key={it.text}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <it.icon className="h-5 w-5 text-gray-600" />
                  <span>{it.text}</span>
                </div>
              ))}
            </div>
          </CardLayout>

          {/* <CardLayout
            header={<h3 className="text-lg font-semibold">Recent Conversations</h3>}
            bordered
          >
            <ul className="space-y-2">
              {recentConvos.map((c, i) => (
                <li
                  key={i}
                  className="flex justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <span>{c.title}</span>
                  <span className="text-xs text-gray-400">{c.time}</span>
                </li>
              ))}
            </ul>
          </CardLayout> */}
        </div>
      </div>
    </DashboardLayout>
  )
}
