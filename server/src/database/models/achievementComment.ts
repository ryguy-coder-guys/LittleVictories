import { DataTypes, Model } from 'sequelize';
import { dbConnection } from '..';
import { User } from './user';
import { Achievement } from './achievement';

interface AchievementCommentInterface extends Model {
  id: number;
  user_id: string;
  achievement_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AchievementComment =
  dbConnection.define<AchievementCommentInterface>(
    'AchievementsComment',
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
      content: {
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
