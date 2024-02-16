import { PrismaClient } from '@prisma/client';
import { UserRegister } from '../global';

const prisma = new PrismaClient();

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
        let sql = ``
    } catch (err) {
        
    }
}

// const loginDriver = async (driverLogin, driverPassword) => {
//     try {
//         let sql = `SELECT * FROM tbl_motorista WHERE email = '${driverLogin}' AND senha = md5('${driverPassword}');`

//         const result = await prisma.$queryRawUnsafe(sql)

//         if (result.length > 0) {
//             return result
//         } else {
//             return false
//         }
//     } catch (err) {
//         return false
//     }
// }