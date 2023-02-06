import Team from '../database/models/Team';

class TeamService {
  constructor(private teamModel = Team) {}

  public async getAllTeams() {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async getTeamById(id: string) {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}

export default TeamService;
