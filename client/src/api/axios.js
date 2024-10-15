import axios from "axios";

const instance = axios.create({
    baseURL: "https://mern-vercel-api-ruddy.vercel.app/api/",
    withCredentials: true,
});

export default instance;