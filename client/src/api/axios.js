import axios from "axios";

const instance = axios.create({
    baseURL: "https://mern-vercel-api-ruddy.vercel.app/api",
    //baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export default instance;