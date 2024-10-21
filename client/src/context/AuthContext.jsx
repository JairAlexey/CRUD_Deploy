import { createContext, useState, useContext, useEffect } from "react";
import { signupRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
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
            const res = await signupRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (err) {
            if (Array.isArray(err.response.data)) {
                return setErrors(err.response.data);
            }
            setErrors([err.response.data.message]);
        }
    }

    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (err) {
            if (Array.isArray(err.response.data)) {
                return setErrors(err.response.data);
            }
            setErrors([err.response.data.message]);
        }
    }

    const checkToken = () => {
        const token = Cookies.get('token');
        if (!token) {
            // Redirigir a la página de inicio de sesión o manejar el error
        }
    };
    
    useEffect(() => {
        checkToken();
    }, []);

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer); // Limpiar el timer si cambia de página
        }
    }, [errors]);

    useEffect(() => {
        const checkLogin = async () => {
            const token = Cookies.get('token'); // Obtener el token directamente
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(token);
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
        <AuthContext.Provider value={{ signup, login, logout, loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
}