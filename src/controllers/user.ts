import { RequestHandler } from "express";
import { z } from "zod";
import * as user from '../models/DAO/user';

export const addUser: RequestHandler = async (req, res) => {
    const addUserSchema = z.object({
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
        id_posicao: z.number().min(1).max(6),
        id_sexo: z.number().min(1).max(2),
        data_nasc: z.date(),
        foto: z.string()
    })
    const body = addUserSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Invalid data' });

    // const newUser = await user.insertUser({

    // });
}