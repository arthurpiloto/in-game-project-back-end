import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type User = { nome: string, email: string, senha: string, id_posicao: number, id_sexo: number, data_nasc: Date, foto: string | undefined }
export const insertUser = async (data: User) => {
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