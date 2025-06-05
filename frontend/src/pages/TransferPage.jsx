import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltDown } from "react-icons/fa";

import axios from 'axios';

const TransferPage = () => {

    const navigate = useNavigate();

    const [userWallets, setUserWallets] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [selectedWalletId, setselectedWalletId] = useState("");
    const [selectedCurrencyId, setselectedCurrencyId] = useState("");
    const [error, setError] = useState(false);
    const [amount, setAmount] = useState(0);
    const [recieverUser, setRecieverUser] = useState("");
    const [amountError, setAmountError] = useState(false);
    const [success, setSuccess] = useState(false);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleWalletChange = (e) => {
        setselectedWalletId(e.target.value);
    }
    const handleCurrencyChange = (e) => {
        setselectedCurrencyId(e.target.value);
    }

    const handleTransfer = async () => {
        console.log(selectedWalletId, selectedCurrencyId, amount, recieverUser);
        if(amount <= 0){
            setAmountError(true);
            return;
        }
        if(selectedWalletId === "" || selectedCurrencyId === "" || recieverUser.trim() === ""){
            setError(true);
            return;
        }
        try{
            await axios.post('http://localhost:3000/api/transfer', {
                senderWalletId: selectedWalletId,
                recieverUsername: recieverUser.trim(),
                amount: parseFloat(amount),
                targetCurrencyId: selectedCurrencyId
            }, {
                headers: { Authorization: token }
            });
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }catch(error){
            console.log(error);
            setError(true);
        }
    }

    useEffect(()=>{


        if(!token || !user){
            navigate('/login');
        }

        const fetchWallets = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/wallet/user', {
                    headers: { Authorization: token }
                });
                setUserWallets(response.data)
                
            }catch(error){
                console.log(error);
                setError(true);
            }
        }
        fetchWallets();

        const fetchCurrencies = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/currency');
                setCurrencies(response.data);
            }catch(error){
                console.log(error);
                setError(true);
            }
        }
        fetchCurrencies();
    }, [])

  return (
    <div className='h-screen w-screen p-15'>
        <div className='flex flex-col items-center justify-start h-full bg-gray-200 rounded-3xl p-10'>
            <h1 className='text-4xl font-bold text-yellow-500 mb-8'>Transferir</h1>
            <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
                <label htmlFor="userWallet" className='text-lg font-bold text-gray-600 mb-2'>Mi Billetera</label>
                <select id="userWallet" value={selectedWalletId} onChange={handleWalletChange} className="block w-1/3 pl-3 pr-10 py-2 text-base border focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md cursor-pointer">
                    <option value="" disabled>Selecciona una wallet</option>
                    {userWallets.map((wallet) => (
                        <option key={wallet.id} value={wallet.id}>
                            {wallet.Currency.name.toUpperCase()} - {wallet.balance} {wallet.Currency.symbol}
                        </option>
                    ))}
                </select>
                <div className='flex items-center gap-2 justify-center'>
                    <p>Cantidad: </p>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='w-1/3 pl-3 pr-10 py-2 text-base border focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md' />
                </div>
                {amountError && <p className='text-red-500'>Cantidad debe ser mayor que 0</p>}
                <FaLongArrowAltDown className='text-4xl text-gray-600' />
                <h2 className='text-lg font-bold text-gray-600 mb-1'>Convertir a moneda</h2>
                <select id="currencies" value={selectedCurrencyId} onChange={handleCurrencyChange} className="block w-1/3 pl-3 pr-10 py-2 text-base border focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md cursor-pointer">
                    <option value="" disabled>Selecciona una moneda</option>
                    {currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                            {currency.name.toUpperCase()} - {currency.symbol}
                        </option>
                    ))}
                </select>
                <FaLongArrowAltDown className='text-4xl text-gray-600' />
                <h2 className='text-lg font-bold text-gray-600 mb-1'>Enviar a:</h2>
                <input type="text" placeholder='Usuario al que enviar' value={recieverUser} onChange={(e) => setRecieverUser(e.target.value)} className='w-1/3 pl-3 pr-10 py-2 text-base border focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md mb-8' />
                <button onClick={handleTransfer} className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 hover:scale-105 transition-all duration-300 cursor-pointer'>Transferir</button>
                {error && <p className='text-red-500'>Error al transferir</p>}
                {success && <p className='text-green-500'>Transferencia exitosa</p>}
                <button onClick={() => navigate('/')} className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer'>Cancelar</button>
            </div>
        </div>
    </div>
  )
}

export default TransferPage