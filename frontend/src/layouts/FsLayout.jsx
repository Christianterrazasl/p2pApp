import React from 'react'

function FsLayout({children}) {
  return (
    <div className='bg-gray-800 h-screen w-screen p-10 overflow-hidden'>
      <div className='rounded-xl border-2 border-gray-300 w-full h-full flex flex-col justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

export default FsLayout