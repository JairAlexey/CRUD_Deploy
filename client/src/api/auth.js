import axios from './axios';

export const signupRequest = user => axios.post(`/signup`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verifyToken');

export const logoutRequest = () => axios.get('/logout');