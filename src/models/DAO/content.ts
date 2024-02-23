import { PrismaClient } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

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
            ON tbl_video.id_tipo_treino = tbl_tipo_treino.id;`

        const result: JsonArray = await prisma.$queryRawUnsafe(sql);

        if (result.length > 0) return result;
        return false;

    } catch (err) {
        return false;
    }
}
