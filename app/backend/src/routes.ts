import { Router } from 'express';
import LoginController from './controllers/LoginController';
import TeamController from './controllers/TeamController';
import MatchController from './controllers/MatchController';
import verifier from './middlewares/LoginMiddleware';
import { tokenValidation } from './auth/jwt';

const loginController = new LoginController();
const teamController = new TeamController();
const matchController = new MatchController();
const router = Router();

router.post('/');
router.post('/login', verifier, loginController.loginUser);
router.get('/login/validate', tokenValidation, loginController.validateLogin);
router.get('/teams', teamController.getAllTeams);
router.get('/teams/:id', teamController.getTeamById);
router.get('/matches', matchController.getAllMatches);
router.post('/matches', tokenValidation, matchController.postMatch);

export default router;
