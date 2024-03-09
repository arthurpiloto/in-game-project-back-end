import { Router } from "express";
import * as user from '../controllers/user';
import * as content from '../controllers/content';

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));

router.get('/user/:id', user.getUserById);
router.post('/user', user.addUser);
router.post('/user/login', user.loginUser);

router.get('/contents', content.getContents);
router.get('/contents/:idTipoTreino', content.getContentsByTipoTreino);
router.post('/content', content.addContent);

router.get('/content/videos', content.getVideosContent);
router.post('/content/video', content.addVideo);

router.get('/content/texts', content.getTextsContent);
router.post('/content/text', content.addText);

export default router;