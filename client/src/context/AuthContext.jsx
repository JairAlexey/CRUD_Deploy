import { createContext, useState, useContext, useEffect } from "react";
import { signupRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signup = async (user) => {
        try {
            const res = await signupRequest(user)
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch
        (err) {
            if (Array.isArray(err.response.data)) {
                return setErrors(err.response.data);
            }
            setErrors([err.response.data.message]);
        }
    }

    const login = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch
        (err) {
            if (Array.isArray(err.response.data)) {
                return setErrors(err.response.data);
            }
            setErrors([err.response.data.message]);
        }
    }

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer) //Si cambia de pagina se limpia el timer
        }
    }, [errors]) //Funcion para limpiar los errores despues de 5 segundos

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) { //Primero comprueba si no hay token
                setIsAuthenticated(false); //Si no hay token, isAuthenticated es false
                setLoading(false); //No esta cargando
                return setUser(null); //No hay usuario
            }

            try {
                const res = await verifyTokenRequest(cookies.token); //Si hay token, verifica el token, es decir se envia al backend para verificar si es valido
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ signup, login, logout,loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    )
}