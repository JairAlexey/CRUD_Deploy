import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { tokenSecret } from '../config.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        //Busacamos al usuario (validacion)
        const userFound = await User.findOne({email});
        if (userFound) {
            return res.status(400).json(["El email ya esta en uso"]);
        }
        //Encriptamos la contraseña
        const encryptedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: encryptedPassword,
        });

        //Guardamos el usuario en la base de datos
        const userSaved = await newUser.save();

        const token = await createToken({ id: userSaved._id });

        res.cookie('token', token, {
            httpOnly: true, // Esto evita que el token sea accesible desde JavaScript
            secure: process.env.NODE_ENV === 'production', // Asegúrate de que esto esté habilitado en producción
            sameSite: 'Strict', // O 'Lax', dependiendo de tus necesidades
        });
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    }
    catch (error) {
        res.status(500).send({message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscamos el usuario en la base de datos
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, userFound.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = await createToken({ id: userFound._id });
        
        // Enviamos la respuesta al cliente
        res.cookie('token', token, {
            httpOnly: true, // Esto evita que el token sea accesible desde JavaScript
            secure: process.env.NODE_ENV === 'production', // Asegúrate de que esto esté habilitado en producción
            sameSite: 'Strict', // O 'Lax', dependiendo de tus necesidades
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const logout = async (req, res) => {
    res.cookie('token', '', {
    expires: new Date(0),
    });
    return res.status(200).json({ message: 'Sesión cerrada' });
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if (!token) return res.status(401).json({ message: 'No autorizado' });

    jwt.verify(token, tokenSecret, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' });

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' });
        
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    });
}