import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => {return useContext(AuthContext);}

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            console.log("Token found");
        }else{
            console.log("No token found");
        }
    }, []);


    const login = async (username, password) => {
        try{
            const response = await axios.post('http://localhost:3000/api/login', {username, password});
            if(response.status === 200){
                setUsername(response.data.username);
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        }catch(error){
            console.error(error);
        }
    }

    const logout = () => {
        setUsername("");
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{login, logout, username}}>
            {children}
        </AuthContext.Provider>
    )
}