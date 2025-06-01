import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();
export const useAuth = () => {return useContext(AuthContext);}

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        setIsAuthenticated(true);
        setUser(username);
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated, user}}>
            {children}
        </AuthContext.Provider>
    )
}