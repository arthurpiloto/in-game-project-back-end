import { RequestHandler } from "express";
import * as content from '../models/DAO/content';
import { MESSAGE_ERROR } from "../utils/config";

export const getVideosContent: RequestHandler = async (req, res) => {
    const videos = await content.selectVideosContent();

    if (videos) return res.status(200).json({ videos: videos });
    return res.status(500).json({ error: MESSAGE_ERROR.INTERNAL_ERROR });
}
