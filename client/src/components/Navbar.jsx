import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

function Navbar() {

    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <nav>
            <Link to="/"><FaHome style={{ fontSize: '24px' }} /></Link> 
            <ul>
                {isAuthenticated ? (
                <>
                    <li>
                        <Link to="/products">Productos</Link>
                        <button onClick={() => navigate('/add-products')}>Nuevo producto</button>
                        <Link to="/login" onClick={() => {logout();}}>Logout</Link>
                    </li>
                </>
                ) : (
                <>
                    <li>
                        <Link to="/login">Iniciar Sesión</Link>
                        <Link to="/signup">Registrarse</Link>
                    </li>
                </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;