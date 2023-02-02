import { Router } from 'express';
import LoginController from './controllers/LoginController';
import verifier from './middlewares/LoginMiddleware';

const loginController = new LoginController();
const router = Router();

router.post('/');
router.post('/login', verifier, loginController.loginUser);

export default router;
