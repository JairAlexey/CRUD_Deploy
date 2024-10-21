import dotenv from 'dotenv';
dotenv.config();

export const tokenSecret = process.env.TOKEN_SECRET || 'mi_secreto_fijo';