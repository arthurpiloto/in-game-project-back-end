import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type User = { nome: string, email: string, senha: string, id_posicao: number, id_sexo: number, data_nasc: Date, foto?: string }
export const insertUser = async (data: User) => {
    try {
        let sql = `INSERT INTO tbl_user`
    } catch (err) {
        return false
    }
}