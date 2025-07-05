// // src/components/layout/Header.tsx
// import React from 'react'
// import { FiBell } from 'react-icons/fi'
// import Image from 'next/image'

// export interface HeaderProps {
//   title: string
//   notificationCount?: number
//   avatarSrc?: string
// }

// const Header: React.FC<HeaderProps> = ({
//   title,
//   notificationCount = 0,
//   avatarSrc = '/avatar.png', // put a default avatar in /public
// }) => (
//   <header className="flex items-center justify-between bg-white px-6 py-3 shadow sticky top-0 z-20">
//     {/* Page title */}
//     <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

//     {/* Right side */}
//     <div className="flex items-center space-x-4">
//       {/* Notifications */}
//       <div className="relative">
//         <FiBell className="text-gray-600 text-2xl cursor-pointer" />
//         {notificationCount > 0 && (
//           <span className="
//             absolute -top-1 -right-1 inline-flex 
//             items-center justify-center px-1.5 py-0.5 
//             text-xs font-bold leading-none text-white 
//             bg-red-600 rounded-full
//           ">
//             {notificationCount}
//           </span>
//         )}
//       </div>

//       {/* Avatar */}
//       <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
//         <Image
//           src={avatarSrc}
//           alt="User Avatar"
//           width={32}
//           height={32}
//         />
//       </div>
//     </div>
//   </header>
// )

// export default Header


// src/components/layout/Header.tsx
import React from 'react'
import { FiBell } from 'react-icons/fi'
import Image from 'next/image'

export interface HeaderProps {
  title: string
  notificationCount?: number
  avatarSrc?: string
  /** Called when the avatar (mobile menu button) is clicked */
  onAvatarClick?: () => void
}

const Header: React.FC<HeaderProps> = ({
  title,
  notificationCount = 0,
  avatarSrc = '/avatar.png',
  onAvatarClick
}) => (
  <header className="flex items-center justify-between bg-white px-6 py-3 shadow sticky top-0 z-20">
    {/* Page title */}
    <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

    {/* Right side */}
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      <div className="relative">
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
      </div>

      {/* Avatar / Mobile menu button */}
      <div
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        onClick={onAvatarClick}
      >
        <Image
          src={avatarSrc}
          alt="User Avatar"
          width={32}
          height={32}
        />
      </div>
    </div>
  </header>
)

export default Header
