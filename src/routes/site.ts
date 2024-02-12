import { Router } from "express";
import * as auth from '../controllers/auth'

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));
router.post('/register', auth.register);

export default router