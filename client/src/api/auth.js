import axios from './axios';

export const signupRequest = async (user) =>
    axios.post(`/auth/signup`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get('/verifyToken');

export const logoutRequest = () => axios.get('/logout');