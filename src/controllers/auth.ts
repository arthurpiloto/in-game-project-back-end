import { RequestHandler } from "express";
import { z } from "zod";

export const register: RequestHandler = (req, res) => {
    const registerSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        position: z.number().min(1).max(6),
        sex: z.number().min(1).max(2),
        age: z.date()
    })
    const body = registerSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Invalid data' })
}