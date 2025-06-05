import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'

function HomePage() {

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [wallets, setWallets] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token || !user){
            navigate('/login');
        }
    },[token, user]);

    useEffect(()=>{
        const fetchWallets = async () => {
            if(token){
                const response = await axios.get('http://localhost:3000/api/wallet/user', {
                    headers: { Authorization: token }
                });
                setWallets(response.data);
            }else{
                navigate('/login');
            }
        }
        fetchWallets();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

  return (
    <div className='h-screen w-screen p-15'>
        <div className='flex flex-col items-center justify-between h-full bg-gray-200 rounded-3xl p-10'>
            <div className='w-full h-full'>
                <div className='w-full flex justify-between'>
                    <h1 className='text-4xl font-bold text-gray-600'>Bienvenido,  <span className='text-yellow-500'>{user? user.username : "usuario"}</span></h1>
                    <div className='flex gap-4'>
                        <button type='button' className='bg-gray-600 text-white text-lg px-5 py-3 rounded-md cursor-pointer hover:bg-gray-700 hover:scale-105 transition-all duration-300' onClick={handleLogout}>Logout</button>
                        <button type='button' className='bg-yellow-500 text-white text-lg px-5 py-3 rounded-md cursor-pointer hover:bg-yellow-600 hover:scale-105 transition-all duration-300' onClick={()=>navigate('/create-wallet')}>Crear billetera</button>
                    </div>
                </div>
                <div className='w-full p-10 text-start'>
                    <h2 className='text-2xl text-gray-700 font-semibold mb-5'>Tus billeteras</h2>
                    <div className='grid grid-cols-6 gap-4'>

                    {wallets.map((wallet)=>(
                        <Card key={wallet.id} title={wallet.Currency.name.toUpperCase()} balance={wallet.balance} id={wallet.id} symbol={wallet.Currency.symbol} />
                    ))}

                    </div>

                </div>
            </div>
            
            <div className='w-full px-10 flex items-center justify-between'>
                <button className='bg-gray-500 text-white text-lg px-5 py-3 w-1/4 rounded-md cursor-pointer hover:bg-yellow-600 hover:scale-105 transition-all duration-300'>Comprar</button>
                <button className='bg-gray-500 text-white text-lg px-5 py-3 w-1/4 rounded-md cursor-pointer hover:bg-gray-700 hover:scale-105 transition-all duration-300' onClick={()=>navigate('/transfer')}>Transferencia</button>
                <button className='bg-gray-500 text-white text-lg px-5 py-3 w-1/4 rounded-md cursor-pointer hover:bg-yellow-600 hover:scale-105 transition-all duration-300'>Vender</button>
            </div>
        </div>
    </div>
  )
}

export default HomePage