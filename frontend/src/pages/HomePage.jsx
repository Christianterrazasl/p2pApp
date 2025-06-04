import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card'

function HomePage() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));
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
                const response = await axios.get('http://localhost:3000/api/wallet', {
                    headers: { Authorization: token }
                });
                setWallets(response.data);
            }else{
                navigate('/login');
            }
        }
        fetchWallets();
    }, [token]);

  return (
    <div className='h-screen w-screen p-15'>
        <div className='flex flex-col items-center justify-start h-full bg-gray-200 rounded-3xl p-10'>
            <h1 className='text-4xl font-bold text-gray-600'>Bienvenido,  <span className='text-yellow-500'>{user? user.username : "usuario"}</span></h1>
            <div className='w-full p-10 text-start'>
                <h2 className='text-2xl text-gray-700 font-semibold mb-5'>Tus billeteras</h2>
                <div className='grid grid-cols-6 gap-4'>

                {wallets.map((wallet)=>(
                    <Card onClick={()=>navigate('/login')} key={wallet.id} title={wallet.Currency.name.toUpperCase()} balance={wallet.balance} />
                ))}

                </div>

            </div>
        </div>
    </div>
  )
}

export default HomePage