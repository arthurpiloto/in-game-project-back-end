import { RequestHandler } from "express";
import * as content from '../models/DAO/content';
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../utils/config";
import { z } from "zod";

// All function related to Content in general
export const addContent: RequestHandler = async (req, res) => {
    const addContentSchema = z.object({
        foto_capa: z.string().max(500).optional(),
        duracao: z.number(),
        titulo: z.string().max(100),
        subtitulo: z.string().max(150),
        id_posicao: z.number().min(1).max(6),
        id_dificuldade: z.number().min(1).max(3),
        id_tipo_conteudo: z.number().min(1).max(2),
        id_tipo_treino: z.number().min(1),
    });
    const body = addContentSchema.safeParse(req.body);
    if (!body.success) return res.status(400).json({ error: MESSAGE_ERROR.INVALID_DATA });

    const newContent = await content.insertContent({
        foto_capa: body.data.foto_capa,
        duracao: body.data.duracao,
        titulo: body.data.titulo,
        subtitulo: body.data.subtitulo,
        id_posicao: body.data.id_posicao,
        id_dificuldade: body.data.id_dificuldade,
        id_tipo_conteudo: body.data.id_tipo_conteudo,
        id_tipo_treino: body.data.id_tipo_treino,
    });
    if (newContent) return res.status(201).json({ message: MESSAGE_SUCCESS.INSERT_ITEM });

    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}

// All functions related to Videos
export const getVideosContent: RequestHandler = async (req, res) => {
    const videos = await content.selectVideosContent();

    if (videos) return res.status(200).json({ videos: videos });
    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}

export const addVideo: RequestHandler = async (req, res) => {
    const addVideoSchema = z.object({
        descricao: z.string().max(1000),
        id_conteudo: z.number()
    });
    const body = addVideoSchema.safeParse(req.body);
    if (!body.success) return res.status(400).json({ error: MESSAGE_ERROR.INVALID_DATA });

    const newVideo = await content.insertVideo(body.data.descricao, body.data.id_conteudo)
    if (newVideo) return res.status(201).json({ message: MESSAGE_SUCCESS.INSERT_ITEM });

    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}

// All functions related to Texts
export const addText: RequestHandler = async (req, res) => {
    const addTextSchema = z.object({
        corpo_texto: z.string().max(1000),
        id_conteudo: z.number()
    });
    const body = addTextSchema.safeParse(req.body);
    if (!body.success) return res.status(400).json({ error: MESSAGE_ERROR.INVALID_DATA });

    const newText = await content.insertText(body.data.corpo_texto, body.data.id_conteudo);
    if (newText) return res.status(201).json({ message: MESSAGE_SUCCESS.INSERT_ITEM });

    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}

export const getTextsContent: RequestHandler = async (req, res) => {
    const texts = await content.selectTextsContent();

    if (texts) return res.status(200).json({ textos: texts });
    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}