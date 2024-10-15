import jwt from 'jsonwebtoken';
import { tokenSecret } from '../config.js';

export const authRequired = (req, res, next) => {
    console.log(req);
    req.user = user; 
        
        next();
};