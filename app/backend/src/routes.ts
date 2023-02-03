import { Router } from 'express';
import LoginController from './controllers/LoginController';
import verifier from './middlewares/LoginMiddleware';
import { tokenValidation } from './auth/jwt';

const loginController = new LoginController();
const router = Router();

router.post('/');
router.post('/login', verifier, loginController.loginUser);
router.get('/login/validate', tokenValidation, loginController.validateLogin);

export default router;
