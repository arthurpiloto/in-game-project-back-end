import { PrismaClient } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

type UserRegister = { nome: string, email: string, senha: string, id_posicao: number, id_sexo: number, data_nasc: Date, foto: string | undefined }
export const insertUser = async (data: UserRegister) => {
    try {
        let sql = `INSERT INTO tbl_user (nome, email, senha, id_posicao, id_sexo, data_nasc, foto) 
        VALUES ('${data.nome}', '${data.email}', md5('${data.senha}'), ${data.id_posicao}, ${data.id_sexo}, '${data.data_nasc.toISOString().split('T')[0]}', '${data.foto}');`

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) return true;
        return false;

    } catch (err) {
        return false;
    }
}

export const findUser = async (email: string, password: string) => {
    try {
        let sql = `SELECT * FROM tbl_user WHERE email = '${email}' AND senha = md5('${password}');`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result[0];
        return false;

    } catch (err) {
        return false
    }
}

export const selectDiverById = async (id: number) => {
    try {
        let sql = `SELECT * FROM tbl_user WHERE id = ${id};`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result[0];
        return false;

    } catch (err) {
        return false;
    }
}
