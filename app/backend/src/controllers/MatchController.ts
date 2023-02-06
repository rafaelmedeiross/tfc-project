import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private matchService = new MatchService()) { }

  public getAllMatches = async (req: Request, res: Response) => {
    const feedback = await this.matchService.getAllMatches();
    res.status(200).json(feedback);
  };
}

export default MatchController;
