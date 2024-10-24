import axios from './axios';

//Peticiones CRUD para productos

export const getProductsRequest = async () => axios.get(`/products`);

export const getProductRequest = async (id) => axios.get(`/products/${id}`);

export const createProductRequest = async (product) => axios.post("/products", product);

export const updateProductRequest = async (id, product) => axios.put(`/products/${id}`, product);

export const deleteProductRequest = async (id) => axios.delete(`/products/${id}`);