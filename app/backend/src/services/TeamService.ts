import Team from '../database/models/Team';

class TeamService {
  constructor(private teamModel = Team) {}

  public getAllTeams() {
    const allTeams = this.teamModel.findAll();
    return allTeams;
  }

  public getTeamById(id: string) {
    const team = this.teamModel.findByPk(id);
    return team;
  }
}

export default TeamService;
