import { Router } from 'express';
import LoginController from './controllers/LoginController';
import TeamController from './controllers/TeamController';
import verifier from './middlewares/LoginMiddleware';
import { tokenValidation } from './auth/jwt';

const loginController = new LoginController();
const teamController = new TeamController();
const router = Router();

router.post('/');
router.post('/login', verifier, loginController.loginUser);
router.get('/login/validate', tokenValidation, loginController.validateLogin);
router.get('/teams', teamController.getAllTeams);
router.get('/teams/:id', teamController.getTeamById);

export default router;
