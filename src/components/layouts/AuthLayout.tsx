// components/AuthLayout.tsx
import { ReactNode } from 'react'
import { FiX } from 'react-icons/fi'
import Image from 'next/image'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <div className="flex">
    {/* Left panel: hidden on <md, flex on md+ */}
    <div className="hidden md:flex md:w-1/2 lg:w-1/2 h-screen bg-[#334155] text-white p-8 flex-col justify-between">
      <div className='flex align-middle'>
        <Image src="https://res.cloudinary.com/dkwptotbs/image/upload/v1751692517/job-connect_lhcl0l.png" alt="Job Connect" width={50} height={40} />
        <h1 className="mt-4 text-3xl font-bold">JobConnect</h1>
      </div>
      <p className="text-base leading-relaxed">
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Voluptatum
        beatae ratione, possimus laborum officiis asperiores incidunt facere
        atque neque veritatis provident vitae saepe a itaque sint voluptatem
        quos ipsam quia. */}
      </p>
    </div>

    {/* Right panel: occupies full width on <md, half on md+ */}
    <div className="w-full md:w-1/2 lg:w-1/2 h-screen p-12 relative bg-white overflow-auto">
      {/* Close icon */}
      {/* <FiX
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer"
        size={20}
      /> */}

      {/* Form container */}
      <div className="w-full max-w-md mx-auto mt-4">
        {children}
      </div>
    </div>
  </div>
)

export default AuthLayout
