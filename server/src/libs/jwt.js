import jwt from 'jsonwebtoken';
import {tokenSecret} from '../config.js';
// Función para crear un token
//que es payload en este caso?
//payload es un objeto que contiene la información que se quiere guardar en el token
export function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            tokenSecret,
            {
                expiresIn: 3600
            },
            (error, token) => {
                if (error) reject(error);
                resolve(token);
            }
        );
    });
}