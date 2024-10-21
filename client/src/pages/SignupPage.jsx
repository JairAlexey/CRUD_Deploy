import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: signupErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/products');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <div className="login-container">
            {/* Mostrar errores del backend */}
            {signupErrors.length > 0 && (
                <div className="error-message">
                    {signupErrors.map((error, i) => (
                        <p key={i}>{error}</p>
                    ))}
                </div>
            )}

            <h1>Registrarse</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type='text' 
                        placeholder='Nombre de usuario' 
                        {...register('username', { required: 'El nombre de usuario es requerido' })} 
                        autoComplete="username" 
                    />
                    {errors.username && (
                        <div className="error-message">
                            <p>{errors.username.message}</p>
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <input 
                        type='email' 
                        placeholder='Correo electrónico' 
                        {...register('email', { required: 'El correo electrónico es requerido' })} 
                        autoComplete="email" 
                    />
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
                        autoComplete="new-password" 
                    />
                    {errors.password && (
                        <div className="error-message">
                            <p>{errors.password.message}</p>
                        </div>
                    )}
                </div>
                <button type='submit'>Registrarse</button>
            </form>
            <p className="signup-prompt">
                Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
}

export default SignupPage;
