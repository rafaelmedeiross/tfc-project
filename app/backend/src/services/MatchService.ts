import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import Team from '../database/models/Team';

class MatchService {
  constructor(private matchModel = Match) {}

  public async getAllMatches(): Promise<IMatch[]> {
    const allMatches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  }
}
export default MatchService;
