import jwt from 'jsonwebtoken';
import { tokenSecret } from '../config.js';

export const authRequired = (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null; // Verifica si req.cookies existe
    console.log("Token recibido:", token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, tokenSecret, (err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        
        req.user = user;
        
        next();
    });
};