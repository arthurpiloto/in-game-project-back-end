import { Router } from "express";
import * as user from '../controllers/user'

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));

router.post('/user', user.addUser);
router.post('/user/login', user.loginUser);

export default router