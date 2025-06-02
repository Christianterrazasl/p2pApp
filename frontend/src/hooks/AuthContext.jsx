import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => {return useContext(AuthContext);}

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    const login =async (username, password) => {
        try{
            const response = await axios.post('http://localhost:3000/api/login', {username, password});
            if(response.status === 200){
                setIsAuthenticated(true);
                setUser(response.data.user);
                setToken(response.data.token);
                navigate('/');
            }
        }catch(error){
            console.error(error);
        }
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUser("");
        setToken("");
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated, user, token}}>
            {children}
        </AuthContext.Provider>
    )
}