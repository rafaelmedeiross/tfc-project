import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public getHomeLeaderboard = async (req: Request, res: Response) => {
    const feedback = await this.leaderboardService.getHomeLeaderboard();
    res.status(200).json(feedback);
  };

  public getAwayLeaderboard = async (req: Request, res: Response) => {
    const feedback = await this.leaderboardService.getAwayLeaderboard();
    res.status(200).json(feedback);
  };
}

export default LeaderboardController;
