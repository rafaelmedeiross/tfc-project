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
    const { message, createdMatch } = feedback;
    if (message) return res.status(404).json({ message });
    res.status(201).json(createdMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const numberId = parseInt(id, 10);
    const feedback = await this.matchService.finishMatch(numberId);
    res.status(200).json(feedback);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const numberId = parseInt(id, 10);
    const feedback = await this.matchService.updateMatch(numberId, homeTeamGoals, awayTeamGoals);
    res.status(200).json(feedback);
  };
}

export default MatchController;
