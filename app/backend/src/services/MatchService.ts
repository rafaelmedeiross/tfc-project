import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import Team from '../database/models/Team';

class MatchService {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  constructor(private matchModel = Match) {}

  public async getAllMatches(inProgress?: string): Promise<IMatch[]> {
    const inProgressStatus = inProgress === 'true';
    const where = inProgress ? { inProgress: inProgressStatus } : {};
    const allMatches = await this.matchModel.findAll({
      where,
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  }

  public async postMatch({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals,
  }: IMatch): Promise<IMatch | null> {
    const { id } = await this.matchModel.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    const createdMatch = await this.matchModel.findByPk(id);
    return createdMatch;
  }

  public async finishMatch(id: number): Promise<{ message: string } > {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}
export default MatchService;
