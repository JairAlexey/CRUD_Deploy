import { useProducts } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';

function ProductCard({ product }) {
    const { deleteProduct } = useProducts();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/products/${product._id}`);
    };

    return (
        <div className="product-card">
            <h1>{product.name}</h1>
            <p>Descripción: {product.description}</p>
            <p>Precio: {product.price}$</p>
            <p>Categoría: {product.category}</p>
            <div className="button-container">
                <button className="button-editar" onClick={handleEdit}><FaEdit /> Editar</button>
                <button
                    className="button-eliminar"
                    onClick={() => {
                        deleteProduct(product._id);
                    }}
                >
                    <FaTrash /> Eliminar
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
