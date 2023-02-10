import ITeam from '../../interfaces/ITeam';
import IMatch from '../../interfaces/IMatch';
import ITeamStats from '../../interfaces/ITeamStats';

const initialValues: ITeamStats = {
  name: '',
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsOwn: 0,
  goalsFavor: 0,
  goalsBalance: 0,
  totalPoints: 0,
  efficiency: 0,
};

const calculateInitialValues = (team: ITeam): ITeamStats => ({
  ...initialValues,
  name: team.teamName,
});

const updateTeamStats = (stats: ITeamStats, thisMatch: IMatch): ITeamStats => {
  const teamStats = { ...stats };
  teamStats.totalGames += 1;
  teamStats.goalsOwn += thisMatch.awayTeamGoals;
  teamStats.goalsFavor += thisMatch.homeTeamGoals;
  teamStats.goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
  if (thisMatch.homeTeamGoals > thisMatch.awayTeamGoals) {
    teamStats.totalPoints += 3;
    teamStats.totalVictories += 1;
  }
  if (thisMatch.homeTeamGoals < thisMatch.awayTeamGoals) teamStats.totalLosses += 1;
  if (thisMatch.homeTeamGoals === thisMatch.awayTeamGoals) {
    teamStats.totalPoints += 1;
    teamStats.totalDraws += 1;
  }
  teamStats.efficiency = (((teamStats.totalVictories * 3) + teamStats.totalDraws)
  / (teamStats.totalGames * 3)) * 100;
  return teamStats;
};

const teamStats = (team: ITeam, matches: IMatch[]): ITeamStats => matches
  .reduce(
    (acc, thisMatch: IMatch) => updateTeamStats(acc, thisMatch),
    calculateInitialValues(team),
  );

export const leaderboard = (
  homeLeaderboard: ITeamStats[],
  awayLeaderboard: ITeamStats[],
): ITeamStats[] => homeLeaderboard.map((hS) => {
  const aS = awayLeaderboard.find((away) => away.name === hS.name);

  if (!aS) return hS;

  return {
    name: hS.name,
    totalPoints: hS.totalPoints + aS.totalPoints,
    totalGames: hS.totalGames + aS.totalGames,
    totalVictories: hS.totalVictories + aS.totalVictories,
    totalLosses: hS.totalLosses + aS.totalLosses,
    totalDraws: hS.totalDraws + aS.totalDraws,
    goalsFavor: hS.goalsFavor + aS.goalsFavor,
    goalsOwn: hS.goalsOwn + aS.goalsOwn,
    goalsBalance: hS.goalsBalance + aS.goalsBalance,
    efficiency: (((hS.totalVictories + aS.totalVictories) * 3
      + (hS.totalDraws + aS.totalDraws)) / ((hS.totalGames + aS.totalGames) * 3)) * 100,
  };
});

export default teamStats;
