import { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from '../components/ProductCard';

function ProductsPage() {
    const { getProducts, products } = useProducts();

    useEffect(() => {
        getProducts();
    }, [])

    if (products.length === 0) {
        return <h1>Aun no tienes productos creados</h1>
    }

    return (
            <div className="grid">
            {
            products.map(product => (
                <ProductCard product={product} key={product._id}></ProductCard>
            ))}
            </div>
    )
}

export default ProductsPage;