import jwt from 'jsonwebtoken';
import { tokenSecret } from '../config.js';

export const authRequired = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null; 
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, tokenSecret, (err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        
        req.user = user; 
        next();
    });
};