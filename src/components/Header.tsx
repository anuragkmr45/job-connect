// src/components/layout/Header.tsx
"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { FiBell } from 'react-icons/fi'
import Image from 'next/image'
import { AVATAR_FALLBACK } from '@/constants/app.constanst'
import { useGetProfileQuery } from '@/services/profileService'

export interface HeaderProps {
  title: string
  notificationCount?: number
  avatarSrc?: string
}

const Header: React.FC<HeaderProps> = ({
  title,
  notificationCount = 0,
}) => {
  const router = useRouter()
    const {
        data: profile,
        isLoading: loadingProfile,
        isError: fetchError,
    } = useGetProfileQuery();

  // const {profile_pic_url, aadhaar, contact, created_at, email, id, military_trade_id, name,pan, preferred_location_ids, } = profile || {}

  const { profile_pic_url = AVATAR_FALLBACK } = profile || {};

  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 shadow sticky top-0 z-20">
      {/* Page title */}
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        {/* <div className="relative">
          <FiBell className="text-gray-600 text-2xl cursor-pointer" />
          {notificationCount > 0 && (
            <span className="
            absolute -top-1 -right-1 inline-flex 
            items-center justify-center px-1.5 py-0.5 
            text-xs font-bold leading-none text-white 
            bg-red-600 rounded-full
          ">
              {notificationCount}
            </span>
          )}
        </div> */}

        {/* Avatar / Mobile menu button */}
        {!loadingProfile && !fetchError &&
          <div onClick={() => router.push('/profile')} className="w-8 h-8 rounded-full border border-black overflow-hidden cursor-pointer flex items-center justify-center">
            <Image
              // src={profile_pic_url ?? AVATAR_FALLBACK}
              src="/profile.jpeg"
              alt="User Avatar"
              width={32}
              height={32}
              className="block"
            />
          </div>
        }
      </div>
    </header >
  )
}

export default Header
