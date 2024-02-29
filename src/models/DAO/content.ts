import { PrismaClient } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

type VideoRegister = { titulo: string, subtitulo: string, descricao: string, id_posicao: number, id_dificuldade: number, id_tipo_treino: number, duracao: number, foto_capa: string | undefined }
export const insertVideo = async (data: VideoRegister) => {
    try {
        let sql = `INSERT INTO tbl_video (titulo, subtitulo, descricao, id_posicao, id_dificuldade, id_tipo_treino, id_tipo_conteudo, duracao, foto_capa)
        VALUES ('${data.titulo}', '${data.subtitulo}', '${data.descricao}', ${data.id_posicao}, ${data.id_dificuldade}, ${data.id_tipo_treino}, 1, ${data.duracao}, '${data.foto_capa}');`

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) return true;
        return false;

    } catch (err) {
        return false;
    }
}

export const selectVideosContent = async () => {
    try {
        let sql = `SELECT CAST(tbl_video.id AS DECIMAL) AS id, tbl_video.foto_capa, tbl_video.duracao, tbl_video.titulo, tbl_video.subtitulo, tbl_video.descricao,
        CAST(tbl_posicao.id AS DECIMAL) AS id_posicao, tbl_posicao.posicao,
        CAST(tbl_dificuldade.id AS DECIMAL) AS id_dificuldade, tbl_dificuldade.dificuldade,
        CAST(tbl_tipo_conteudo.id AS DECIMAL) AS id_tipo_conteudo, tbl_tipo_conteudo.tipo AS tipo_conteudo,
        CAST(tbl_tipo_treino.id AS DECIMAL) AS id_tipo_treino, tbl_tipo_treino.tipo AS tipo_treino
        
        FROM tbl_video
        
        INNER JOIN tbl_posicao
            ON tbl_video.id_posicao = tbl_posicao.id
        INNER JOIN tbl_dificuldade
            ON tbl_video.id_dificuldade = tbl_dificuldade.id
        INNER JOIN tbl_tipo_conteudo
            ON tbl_video.id_tipo_conteudo = tbl_tipo_conteudo.id
        INNER JOIN tbl_tipo_treino
            ON tbl_video.id_tipo_treino = tbl_tipo_treino.id
            
        ORDER BY tbl_video.id DESC;`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result;
        return false;

    } catch (err) {
        return false;
    }
}

type TextRegister = { titulo: string, subtitulo: string, corpo_texto: string, id_posicao: number, id_dificuldade: number, id_tipo_treino: number, duracao: number, foto_capa: string | undefined }
export const insertText = async (data: TextRegister) => {
    try {
        let sql = `INSERT INTO tbl_texto (titulo, subtitulo, corpo_texto, id_posicao, id_dificuldade, id_tipo_treino, id_tipo_conteudo, duracao, foto_capa)
        VALUES ('${data.titulo}', '${data.subtitulo}', '${data.corpo_texto}', ${data.id_posicao}, ${data.id_dificuldade}, ${data.id_tipo_treino}, 2, ${data.duracao}, '${data.foto_capa}');`

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) return true;
        return false;

    } catch (err) {
        return false;
    }
}


export const selectTextsContent = async () => {
    try {
        let sql = `SELECT CAST(tbl_texto.id AS DECIMAL) AS id, tbl_texto.foto_capa, tbl_texto.duracao, tbl_texto.titulo, tbl_texto.subtitulo, tbl_texto.corpo_texto,
        CAST(tbl_posicao.id AS DECIMAL) AS id_posicao, tbl_posicao.posicao,
        CAST(tbl_dificuldade.id AS DECIMAL) AS id_dificuldade, tbl_dificuldade.dificuldade,
        CAST(tbl_tipo_conteudo.id AS DECIMAL) AS id_tipo_conteudo, tbl_tipo_conteudo.tipo AS tipo_conteudo,
        CAST(tbl_tipo_treino.id AS DECIMAL) AS id_tipo_treino, tbl_tipo_treino.tipo AS tipo_treino
        
        FROM tbl_texto
        
        INNER JOIN tbl_posicao
            ON tbl_texto.id_posicao = tbl_posicao.id
        INNER JOIN tbl_dificuldade
            ON tbl_texto.id_dificuldade = tbl_dificuldade.id
        INNER JOIN tbl_tipo_conteudo
            ON tbl_texto.id_tipo_conteudo = tbl_tipo_conteudo.id
        INNER JOIN tbl_tipo_treino
            ON tbl_texto.id_tipo_treino = tbl_tipo_treino.id
            
        ORDER BY tbl_texto.id DESC;`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result;
        return false;

    } catch (err) {
        return false;
    }
}
