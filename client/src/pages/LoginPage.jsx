import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const { login, errors: loginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();


    const onSubmit = handleSubmit((data) => {
        login(data);
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/products'); 
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="login-container">
            {/* Mostrar errores del backend */}
            {loginErrors.length > 0 && (
                <div className="error-message">
                    {loginErrors.map((error, i) => (
                        <p key={i}>{error}</p>
                    ))}
                </div>
            )}
            <h1>Iniciar Sesión</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type='email' 
                        placeholder='Correo electrónico' 
                        {...register('email', { required: 'El correo electrónico es requerido' })}
                        autoComplete="email"
                    />
                    {/* Mostrar errores de validación del frontend */}
                    {errors.email && (
                        <div className="error-message">
                            <p>{errors.email.message}</p>
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <input 
                        type='password' 
                        placeholder='Contraseña' 
                        {...register('password', { 
                            required: 'La contraseña es requerida', 
                            minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' }
                        })}
                        autoComplete="current-password"
                    />
                    {errors.password && (
                        <div className="error-message">
                            <p>{errors.password.message}</p>
                        </div>
                    )}
                </div>
                <button type='submit'>Iniciar sesión</button>
            </form>
            <p className="signup-prompt">
                No tienes cuenta? <Link to="/signup">Regístrate</Link>
            </p>
        </div>
    );
}

export default LoginPage;
