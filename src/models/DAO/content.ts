import { PrismaClient } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// All function related to Content in general
type Content = { foto_capa: string | undefined, duracao: number, titulo: string, subtitulo: string, id_posicao: number, id_dificuldade: number, id_tipo_conteudo: number, id_tipo_treino: number }
export const insertContent = async (data: Content) => {
    try {
        let sql = `INSERT INTO tbl_conteudo (foto_capa, duracao, titulo, subtitulo, id_posicao, id_dificuldade, id_tipo_conteudo, id_tipo_treino)
        VALUES ('${data.foto_capa}', ${data.duracao}, '${data.titulo}', '${data.subtitulo}', ${data.id_posicao}, ${data.id_dificuldade}, ${data.id_tipo_conteudo}, ${data.id_tipo_treino});`

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) return true;
        return false;

    } catch (err) {
        return false
    }
}

export const selectContents = async () => {
    try {
        let sql = `SELECT CAST(tbl_conteudo.id AS DECIMAL) AS id_conteudo, tbl_conteudo.foto_capa, tbl_conteudo.duracao, tbl_conteudo.titulo, tbl_conteudo.subtitulo,
        CAST(tbl_posicao.id AS DECIMAL) AS id_posicao, tbl_posicao.posicao,
        CAST(tbl_dificuldade.id AS DECIMAL) AS id_dificuldade, tbl_dificuldade.dificuldade,
        CAST(tbl_tipo_conteudo.id AS DECIMAL) AS id_tipo_conteudo, tbl_tipo_conteudo.tipo AS tipo_conteudo,
        CAST(tbl_tipo_treino.id AS DECIMAL) AS id_tipo_treino, tbl_tipo_treino.tipo AS tipo_treino
        
        FROM tbl_conteudo
        
        INNER JOIN tbl_posicao
            ON tbl_conteudo.id_posicao = tbl_posicao.id
        INNER JOIN tbl_dificuldade
            ON tbl_conteudo.id_dificuldade = tbl_dificuldade.id
        INNER JOIN tbl_tipo_conteudo
            ON tbl_conteudo.id_tipo_conteudo = tbl_tipo_conteudo.id
        INNER JOIN tbl_tipo_treino
            ON tbl_conteudo.id_tipo_treino = tbl_tipo_treino.id
                    
        ORDER BY tbl_conteudo.id DESC;`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result;
        return false;
    } catch (err) {
        return false;
    }
}

export const selectContentsByTipoTreino = async (id: number) => {
    try {
        let sql = `SELECT CAST(tbl_conteudo.id AS DECIMAL) AS id_conteudo, tbl_conteudo.foto_capa, tbl_conteudo.duracao, tbl_conteudo.titulo, tbl_conteudo.subtitulo,
        CAST(tbl_posicao.id AS DECIMAL) AS id_posicao, tbl_posicao.posicao,
        CAST(tbl_dificuldade.id AS DECIMAL) AS id_dificuldade, tbl_dificuldade.dificuldade,
        CAST(tbl_tipo_conteudo.id AS DECIMAL) AS id_tipo_conteudo, tbl_tipo_conteudo.tipo AS tipo_conteudo,
        CAST(tbl_tipo_treino.id AS DECIMAL) AS id_tipo_treino, tbl_tipo_treino.tipo AS tipo_treino
        
        FROM tbl_conteudo
        
        INNER JOIN tbl_posicao
            ON tbl_conteudo.id_posicao = tbl_posicao.id
        INNER JOIN tbl_dificuldade
            ON tbl_conteudo.id_dificuldade = tbl_dificuldade.id
        INNER JOIN tbl_tipo_conteudo
            ON tbl_conteudo.id_tipo_conteudo = tbl_tipo_conteudo.id
        INNER JOIN tbl_tipo_treino
            ON tbl_conteudo.id_tipo_treino = tbl_tipo_treino.id
                    
        WHERE tbl_conteudo.id_tipo_treino = ${id};`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result;
        return false;
    } catch (err) {
        return false;
    }
}

// All functions related to Videos
export const insertVideo = async (descricao: string, id_conteudo: number) => {
    try {
        let sql = `INSERT INTO tbl_video (descricao, id_conteudo)
        VALUES ('${descricao}', ${id_conteudo});`

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) return true;
        return false;

    } catch (err) {
        return false;
    }
}

export const selectVideosContent = async () => {
    try {
        let sql = `SELECT CAST(tbl_video.id AS DECIMAL) AS id_video, tbl_video.descricao,
        CAST(tbl_conteudo.id AS DECIMAL) AS id_conteudo, tbl_conteudo.foto_capa, tbl_conteudo.duracao, tbl_conteudo.titulo, tbl_conteudo.subtitulo,
        CAST(tbl_posicao.id AS DECIMAL) AS id_posicao, tbl_posicao.posicao,
        CAST(tbl_dificuldade.id AS DECIMAL) AS id_dificuldade, tbl_dificuldade.dificuldade,
        CAST(tbl_tipo_conteudo.id AS DECIMAL) AS id_tipo_conteudo, tbl_tipo_conteudo.tipo AS tipo_conteudo,
        CAST(tbl_tipo_treino.id AS DECIMAL) AS id_tipo_treino, tbl_tipo_treino.tipo AS tipo_treino
        
        FROM tbl_video
        
        INNER JOIN tbl_conteudo
            ON tbl_video.id_conteudo = tbl_conteudo.id
        INNER JOIN tbl_posicao
            ON tbl_conteudo.id_posicao = tbl_posicao.id
        INNER JOIN tbl_dificuldade
            ON tbl_conteudo.id_dificuldade = tbl_dificuldade.id
        INNER JOIN tbl_tipo_conteudo
            ON tbl_conteudo.id_tipo_conteudo = tbl_tipo_conteudo.id
        INNER JOIN tbl_tipo_treino
            ON tbl_conteudo.id_tipo_treino = tbl_tipo_treino.id
            
        ORDER BY tbl_video.id DESC;`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result;
        return false;

    } catch (err) {
        return false;
    }
}

export const selectVideosByTipoTreino = async (id: number) => {
    try {
        let sql = `SELECT CAST(tbl_video.id AS DECIMAL) AS id_video, tbl_video.descricao,
        CAST(tbl_conteudo.id AS DECIMAL) AS id_conteudo, tbl_conteudo.foto_capa, tbl_conteudo.duracao, tbl_conteudo.titulo, tbl_conteudo.subtitulo,
        CAST(tbl_posicao.id AS DECIMAL) AS id_posicao, tbl_posicao.posicao,
        CAST(tbl_dificuldade.id AS DECIMAL) AS id_dificuldade, tbl_dificuldade.dificuldade,
        CAST(tbl_tipo_conteudo.id AS DECIMAL) AS id_tipo_conteudo, tbl_tipo_conteudo.tipo AS tipo_conteudo,
        CAST(tbl_tipo_treino.id AS DECIMAL) AS id_tipo_treino, tbl_tipo_treino.tipo AS tipo_treino
        
        FROM tbl_video
        
        INNER JOIN tbl_conteudo
            ON tbl_video.id_conteudo = tbl_conteudo.id
        INNER JOIN tbl_posicao
            ON tbl_conteudo.id_posicao = tbl_posicao.id
        INNER JOIN tbl_dificuldade
            ON tbl_conteudo.id_dificuldade = tbl_dificuldade.id
        INNER JOIN tbl_tipo_conteudo
            ON tbl_conteudo.id_tipo_conteudo = tbl_tipo_conteudo.id
        INNER JOIN tbl_tipo_treino
            ON tbl_conteudo.id_tipo_treino = tbl_tipo_treino.id
            
        WHERE tbl_conteudo.id_tipo_treino = ${id}
        ORDER BY tbl_video.id DESC;`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result;
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// All functions related to Texts
export const insertText = async (corpo_texto: string, id_conteudo: number) => {
    try {
        let sql = `INSERT INTO tbl_texto (corpo_texto, id_conteudo)
        VALUES ('${corpo_texto}', ${id_conteudo});`

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) return true;
        return false;

    } catch (err) {
        return false;
    }
}

export const selectTextsContent = async () => {
    try {
        let sql = `SELECT CAST(tbl_texto.id AS DECIMAL) AS id_texto, tbl_texto.corpo_texto,
        CAST(tbl_conteudo.id AS DECIMAL) AS id_conteudo, tbl_conteudo.foto_capa, tbl_conteudo.duracao, tbl_conteudo.titulo, tbl_conteudo.subtitulo,
        CAST(tbl_posicao.id AS DECIMAL) AS id_posicao, tbl_posicao.posicao,
        CAST(tbl_dificuldade.id AS DECIMAL) AS id_dificuldade, tbl_dificuldade.dificuldade,
        CAST(tbl_tipo_conteudo.id AS DECIMAL) AS id_tipo_conteudo, tbl_tipo_conteudo.tipo AS tipo_conteudo,
        CAST(tbl_tipo_treino.id AS DECIMAL) AS id_tipo_treino, tbl_tipo_treino.tipo AS tipo_treino
        
        FROM tbl_texto
        
        INNER JOIN tbl_conteudo
            ON tbl_texto.id_conteudo = tbl_conteudo.id
        INNER JOIN tbl_posicao
            ON tbl_conteudo.id_posicao = tbl_posicao.id
        INNER JOIN tbl_dificuldade
            ON tbl_conteudo.id_dificuldade = tbl_dificuldade.id
        INNER JOIN tbl_tipo_conteudo
            ON tbl_conteudo.id_tipo_conteudo = tbl_tipo_conteudo.id
        INNER JOIN tbl_tipo_treino
            ON tbl_conteudo.id_tipo_treino = tbl_tipo_treino.id
            
        ORDER BY tbl_texto.id DESC;`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result;
        return false;

    } catch (err) {
        return false;
    }
}
