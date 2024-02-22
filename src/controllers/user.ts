import { RequestHandler } from "express";
import { number, z } from "zod";
import * as user from "../models/DAO/user";
import * as jwt from "../middlewares/jwt";
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../utils/config";

export const addUser: RequestHandler = async (req, res) => {
    const addUserSchema = z.object({
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
        id_posicao: z.number().min(1).max(6),
        id_sexo: z.number().min(1).max(2),
        data_nasc: z.coerce.date(),
        foto: z.string().optional()
    });
    const body = addUserSchema.safeParse(req.body);
    if (!body.success) return res.status(400).json({ error: MESSAGE_ERROR.INVALID_DATA });

    const newUser = await user.insertUser({
        nome: body.data.nome,
        email: body.data.email,
        senha: body.data.senha,
        id_posicao: body.data.id_posicao,
        id_sexo: body.data.id_sexo,
        data_nasc: body.data.data_nasc,
        foto: body.data.foto
    });
    if (newUser) return res.status(201).json({ message: MESSAGE_SUCCESS.INSERT_ITEM });

    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}

export const loginUser: RequestHandler = async (req, res) => {
    const loginUserSchema = z.object({
        email: z.string(),
        senha: z.string()
    });
    const body = loginUserSchema.safeParse(req.body);
    if (!body.success) return res.status(400).json({ error: MESSAGE_ERROR.INVALID_DATA });

    const userData = await user.findUser(body.data.email, body.data.senha);
    if (userData) {
        const tokenJWT = await jwt.createJWT(userData);
        return res.status(tokenJWT.status).json({ token: tokenJWT.token, id_user: tokenJWT.user_id });
    }
    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}

export const getUserById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const userData = await user.selectDiverById(parseInt(id));
    if (userData) return res.status(200).json(userData);
    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}
