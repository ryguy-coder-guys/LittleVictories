import { DataTypes, Model } from 'sequelize';
import { dbConnection } from '..';
import { User } from './user';
import { Achievement } from './achievement';

interface AchievementLikeInterface extends Model {
  id: number;
  user_id: string;
  achievement_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export const AchievementLike = dbConnection.define<AchievementLikeInterface>(
  'AchievementsLike',
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
    achievement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Achievement,
        key: 'id'
      }
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
