import Team from '../database/models/Team';
import Match from '../database/models/Match';
import teamStats, { leaderboard } from './func/teamStats';
import awayTeamStats from './func/awayTeamStats';
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

  public async getAwayLeaderboard(): Promise<ILeaderboard[] | number> {
    const allTeams = await this.teamModel.findAll();
    const statsByTeam = await Promise.all(allTeams.map(async (team) => {
      const matches = await this.matchModel.findAll({
        where: { awayTeamId: team.id, inProgress: false },
      });
      return awayTeamStats(team, matches);
    }));
    return statsByTeam.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });
  }

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const homeLeaderboard = await this.getHomeLeaderboard();
    const awayLeaderboard = await this.getAwayLeaderboard();

    if (!Array.isArray(homeLeaderboard) || !Array.isArray(awayLeaderboard)) {
      throw new Error('should return arrays');
    }

    return leaderboard(homeLeaderboard, awayLeaderboard).sort((a, c) => {
      if (c.totalPoints !== a.totalPoints) return c.totalPoints - a.totalPoints;
      if (c.goalsBalance !== a.goalsBalance) return c.goalsBalance - a.goalsBalance;
      if (c.goalsFavor !== a.goalsFavor) return c.goalsFavor - a.goalsFavor;
      return 0;
    });
  }
}

export default LeaderboardService;
