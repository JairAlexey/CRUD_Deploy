import { createContext, useState, useContext } from 'react';
import { createProductRequest, getProductRequest, getProductsRequest, deleteProductRequest, updateProductRequest} from '../api/products';


const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider')
    }
    return context;
}

export function ProductProvider({ children }) {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try{
            const res = await getProductsRequest()
            setProducts(res.data);
        }catch (error){
            console.error("Error al obtener productos:", error.response ? error.response.data : error.message);        
        }
    }

    const createProduct = async (product) => {
        try {
            const res = await createProductRequest(product);
            console.log(res);
        } catch (error) {
            console.error("Error al crear el producto:", error.response.data);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            if (res.status === 204) {
                // Asegúrate de que estás usando el mismo identificador
                setProducts(products.filter(product => product._id !== id)); // Cambia product.id a product._id
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateProduct = async (id, product) => {
        try{
            await updateProductRequest(id, product);
        }catch(error){
            console.error(error);
        }
    }

    const getProduct = async (id) => {
        try{
            const res = await getProductRequest(id);
            return res.data;
        }catch(error){
            console.error(error);
        }
    }

    return <ProductContext.Provider
        value={{
            products,
            createProduct,
            getProducts,
            deleteProduct,
            getProduct,
            updateProduct,
        }}
    >
        {children}
    </ProductContext.Provider>
}   