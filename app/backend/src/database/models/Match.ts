import { Model, DataTypes } from 'sequelize';
import Team from './Team';
import db from '.';

class Match extends Model {
  public id!: number;
  public homeTeamId!: number;
  public homeTeamGoals!: number;
  public awayTeamId!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Match.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
Team.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});
Team.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

export default Match;
