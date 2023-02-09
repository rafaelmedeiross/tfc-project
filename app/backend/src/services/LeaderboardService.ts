import Team from '../database/models/Team';
import Match from '../database/models/Match';
import teamStats from './func/teamStats';
import ILeaderboard from '../interfaces/ILeaderboard';

class LeaderboardService {
  constructor(private teamModel = Team, private matchModel = Match) {
    this.teamModel = teamModel;
    this.matchModel = matchModel;
  }

  public async getHomeLeaderboard(): Promise<ILeaderboard[] | number> {
    const allTeams = await this.teamModel.findAll();
    const statsByTeam = await Promise.all(allTeams.map(async (team) => {
      const matches = await this.matchModel.findAll({
        where: { homeTeamId: team.id, inProgress: false },
      });
      return teamStats(team, matches);
    }));
    return statsByTeam.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });
  }
}

export default LeaderboardService;
