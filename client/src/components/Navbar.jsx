import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    return (
        <nav>
            <a href="/"><FaHome style={{ fontSize: '24px' }} /></a> 
            <ul>
                {isAuthenticated ? (
                <>
                    <li>
                        <a href="/products">Productos</a>
                        <button onClick={() => navigate('/add-products')}>Nuevo producto</button>
                        <a href="/login" onClick={() => {logout();}}>Logout</a>
                    </li>
                </>
                ) : (
                <>
                    <li>
                        <a href="/login">Iniciar Sesión</a>
                        <a href="/signup">Registrarse</a>
                    </li>
                </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;