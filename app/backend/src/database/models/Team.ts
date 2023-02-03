import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Match';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  underscored: true,
  sequelize: db,
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

export default Team;
