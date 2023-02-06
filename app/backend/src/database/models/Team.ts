import { Model, DataTypes } from 'sequelize';
import db from '.';

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

export default Team;
