import Product from '../models/product.model.js';


export const getProducts = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }

    try {
        const products = await Product.find({ user: req.user.id }).populate("user");
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newProduct = new Product({ name, description, price, category, user: req.user.id }); // Cambiado aquí
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct)
            return res.status(404).json({ message: "Product not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const updateProduct = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { name, description, price, category },
            { new: true }
        );
        return res.json(updateProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

