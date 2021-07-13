import { DataTypes, Model } from 'sequelize';
import { dbConnection } from '..';
import { User } from './user';

export type AchievementType =
  | 'levelOne'
  | 'levelFive'
  | 'levelTen'
  | 'fiveHabits'
  | 'fiveTasks'
  | 'threeFollowees'
  | 'fiveFollowees';

interface AchievementInstance extends Model {
  id: number;
  user_id: string;
  achievement_type: AchievementType;
  createdAt: Date;
  updatedAt: Date;
}

export const Achievement = dbConnection.define<AchievementInstance>(
  'Achievement',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    achievement_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);
