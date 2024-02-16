import { RequestHandler } from "express";
import { z } from "zod";
import * as user from '../models/DAO/user';
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../utils/config";

export const addUser: RequestHandler = async (req, res) => {
    const addUserSchema = z.object({
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
        id_posicao: z.number().min(1).max(6),
        id_sexo: z.number().min(1).max(2),
        data_nasc: z.coerce.date(),
        foto: z.string()
    })
    const body = addUserSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: MESSAGE_ERROR.INVALID_DATA });

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

}

// const driverLogin = async (driverLogin, driverPassword) => {
//     if (driverLogin == '' || driverLogin == undefined || driverPassword == '' || driverPassword == undefined) {
//         return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
//     } else {
//         const login = await loginDriver(driverLogin, driverPassword)

//         if (login) {
//             return { status: 200, message: login }
//         } else {
//             return { message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404 }
//         }
//     }
// }