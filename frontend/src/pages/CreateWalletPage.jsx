import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateWalletPage = () => {
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        if(!token || !user){
            navigate('/login');
        }    
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/currency');
                setCurrencies(response.data);
                if (response.data.length > 0) {
                    setSelectedCurrency(response.data[0].id);
                }
            } catch (error) {
                setError(true);
                console.error('Error fetching currencies:', error);
            }
        };
        fetchCurrencies();
    }, []);

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    const handleCreateWallet = async () => {
        try {
            await axios.post('http://localhost:3000/api/wallet', {
                currencyId: parseInt(selectedCurrency),
                userId: parseInt(user.id)
        }, {
            headers: { Authorization: token }
        });
        navigate('/');
        } catch (error) {
            setError(true);
            console.error('Error creating wallet:', error);
        }
    };

    return (
        <div className='h-screen w-screen p-15'>
            <div className='flex flex-col items-center justify-start h-full bg-gray-200 rounded-3xl p-10'>
                <h1 className='text-4xl font-bold text-gray-600 mb-8'>Crear billetera</h1>
                
                <div className='w-full max-w-md'>
                    <div className='mb-6'>
                        <label htmlFor="currency" className="block text-md font-medium text-gray-700 mb-10">
                            Selecciona la moneda
                        </label>
                        <select
                            id="currency"
                            value={selectedCurrency}
                            onChange={handleCurrencyChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
                        >
                            <option value="" disabled>Selecciona una moneda</option>
                            {currencies.map((currency) => (
                                <option key={currency.id} value={currency.id}>
                                    {currency.name.toUpperCase()}
                                </option>
                            ))}
                        </select>
                        {error && (
                            <p className="mt-2 text-sm text-red-600">
                                "Error al crear la billetera"
                            </p>
                        )}
                    </div>
                    <button type='button' className='block bg-yellow-500 text-white text-lg px-5 py-3 rounded-md cursor-pointer mb-5' onClick={handleCreateWallet}>Crear billetera</button>
                    <button type='button' className='block bg-gray-600 text-white text-lg px-5 py-3 rounded-md cursor-pointer' onClick={()=>navigate('/')}>Volver</button>
                </div>
            </div>
        </div>
    );
};

export default CreateWalletPage;