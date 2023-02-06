import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private teamService = new TeamService()) { }

  public getAllTeams = async (req: Request, res: Response) => {
    const feedback = await this.teamService.getAllTeams();
    res.status(200).json(feedback);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const feedback = await this.teamService.getTeamById(id);
    res.status(200).json(feedback);
  };
}

export default TeamController;
