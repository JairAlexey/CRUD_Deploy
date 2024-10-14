import { useAuth } from '../context/AuthContext';

function HomePage(){
    const { isAuthenticated, user } = useAuth();

    return (
        <div>
            <h1>{isAuthenticated ? `Bienvenido, ${user.username}` : 'Home Page'}</h1>
        </div>
    )
}

export default HomePage;