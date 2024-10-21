import axios from "axios";

const instance = axios.create({
    //baseURL: "https://mern-vercel-api-ruddy.vercel.app/api/",
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado
    }
    return config;
});


export default instance;