import React from 'react'
import { CiCircleQuestion } from "react-icons/ci";
import FsLayout from '../layouts/FsLayout'
import { useNavigate } from 'react-router-dom'

function NotAuthPage() {

    const navigate = useNavigate();
  return (
    <FsLayout>
        <div className="flex flex-col text-gray-300 justify-center items-center gap-10">
            <CiCircleQuestion className='text-9xl'/>
            <h1 className='text-4xl'>Que sos hacker? Sali de aca</h1>
            <button className='bg-gray-700 text-gray-300 p-3 px-6 rounded-xl hover:bg-black hover:cursor-pointer' onClick={()=>navigate('/')}>Volver</button>
        </div>
    </FsLayout>
  )
}

export default NotAuthPage