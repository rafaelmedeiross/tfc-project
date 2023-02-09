interface ITeamStats {
  name: string;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  totalPoints: number;
  goalsOwn: number;
  goalsFavor: number;
  goalsBalance: number;
  efficiency: number;
}

export default ITeamStats;
