import { useForm } from 'react-hook-form';
import { useProducts } from '../context/ProductsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ProductsFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm(); 
    const { createProduct, getProduct, updateProduct } = useProducts();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadProduct() {
            if (params.id) {
                const product = await getProduct(params.id);
                setValue('name', product.name);
                setValue('description', product.description);
                setValue('price', product.price);
                setValue('category', product.category);
            }
        }
        loadProduct();
    }, [params.id, getProduct, setValue]);

    const onSubmit = handleSubmit(async (data) => { 
        data.price = parseFloat(data.price);
        if (params.id) {
            await updateProduct(params.id, data); 
        } else {
            await createProduct(data); 
        }
        navigate('/products'); 
    });

    return (
        <div className="login-container">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Nombre"
                        {...register('name', { required: 'El nombre es requerido', minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' }, maxLength: { value: 50, message: 'Máximo 50 caracteres' }})}
                        autoFocus
                    />
                    {errors.name && (
                        <div className="error-message">
                            <p>{errors.name.message}</p>
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <textarea 
                        rows={3} 
                        type="text"
                        placeholder="Descripción" 
                        {...register('description', { required: 'La descripción es requerida', minLength: { value: 10, message: 'Debe tener al menos 10 caracteres' }, maxLength: { value: 200, message: 'Máximo 200 caracteres' } })}
                    />
                    {errors.description && (
                        <div className="error-message">
                            <p>{errors.description.message}</p>
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <input 
                        type="number" 
                        placeholder="Precio"
                        {...register('price', { required: 'El precio es requerido', valueAsNumber: true, min: { value: 0, message: 'Debe ser un número positivo' }, max: { value: 9999, message: 'El precio no puede superar los 9999' } })}
                    />
                    {errors.price && (
                        <div className="error-message">
                            <p>{errors.price.message}</p>
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Categoría"
                        {...register('category', { required: 'La categoría es requerida', minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' }, maxLength: { value: 50, message: 'Máximo 50 caracteres' } })}
                    />
                    {errors.category && (
                        <div className="error-message">
                            <p>{errors.category.message}</p>
                        </div>
                    )}
                </div>

                <button type="submit">Guardar producto</button>
            </form>
        </div>
    )
}

export default ProductsFormPage;
