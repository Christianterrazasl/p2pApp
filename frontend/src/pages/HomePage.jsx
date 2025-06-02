import React, { useEffect } from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useNavigate } from 'react-router-dom'

function HomePage() {

    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login');
        }
    }, [isAuthenticated]);

    useEffect(()=>{
        const fetchWallets = async () => {
            const response = await axios.get('http://localhost:3000/api/wallets', {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
    }, []);

  return (
    <div className='h-screen w-screen p-15'>
        <div className='flex flex-col items-center justify-start h-full bg-gray-200 rounded-3xl p-10'>
            <h1 className='text-4xl font-bold text-gray-600'>Bienvenido,  <span className='text-yellow-500'>{user? user : "usuario"}</span></h1>
            <div className='w-full p-10 text-start'>
                <h2 className='text-2xl'>Tus billeteras</h2>

            </div>
        </div>
    </div>
  )
}

export default HomePage