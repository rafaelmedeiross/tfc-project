import { Router } from 'express';
import LoginController from './controllers/LoginController';
import TeamController from './controllers/TeamController';
import MatchController from './controllers/MatchController';
import LeaderboardController from './controllers/LeaderboardController';
import verifier from './middlewares/LoginMiddleware';
import matchVerifier from './middlewares/MatchMiddleware';
import { tokenValidation } from './auth/jwt';

const loginController = new LoginController();
const teamController = new TeamController();
const matchController = new MatchController();
const leaderboardController = new LeaderboardController();
const router = Router();

router.post('/');
router.post('/login', verifier, loginController.loginUser);
router.get('/login/validate', tokenValidation, loginController.validateLogin);
router.get('/teams', teamController.getAllTeams);
router.get('/teams/:id', teamController.getTeamById);
router.get('/matches', matchController.getAllMatches);
router.post('/matches', tokenValidation, matchVerifier, matchController.postMatch);
router.patch('/matches/:id/finish', matchController.finishMatch);
router.patch('/matches/:id', matchController.updateMatch);
router.get('/leaderboard/home', leaderboardController.getHomeLeaderboard);
router.get('/leaderboard/away', leaderboardController.getAwayLeaderboard);
router.get('/leaderboard', leaderboardController.getLeaderboard);

export default router;
