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
  constructor(
    private matchModel = Match,
    private teamModel = Team,
  ) {}

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

  public async postMatch(
    {
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals,
    }: IMatch,
  ): Promise<{ message?: string, createdMatch?: IMatch }> {
    const [homeTeam, awayTeam] = await Promise.all([homeTeamId, awayTeamId]
      .map((id) => this.teamModel.findByPk(id)));
    if (!homeTeam || !awayTeam) return { message: 'There is no team with such id!' };

    const { id } = await this.matchModel.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });

    const createdMatch = await this.matchModel.findByPk(id);
    if (!createdMatch) return { message: 'There is no team with such id!' };
    return { createdMatch };
  }

  public async finishMatch(id: number): Promise<{ message: string } > {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<{ message: string } > {
    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'Scored updated sucessfully' };
  }
}

export default MatchService;
