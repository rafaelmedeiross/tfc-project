import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private matchService = new MatchService()) { }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress !== undefined) {
      const feedback = await this.matchService.getAllMatches(inProgress as string);
      return res.status(200).json(feedback);
    }
    const feedback = await this.matchService.getAllMatches();
    res.status(200).json(feedback);
  };

  public postMatch = async (req: Request, res: Response) => {
    const match = req.body;
    const feedback = await this.matchService.postMatch(match);
    res.status(201).json(feedback);
  };
}

export default MatchController;
