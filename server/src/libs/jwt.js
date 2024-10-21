import jwt from 'jsonwebtoken';
import { tokenSecret } from '../config.js';

export const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, tokenSecret, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};