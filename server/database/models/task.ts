import { DataTypes } from 'sequelize';
import { dbConnection } from '..';
import { List } from './list';
import { User } from './user';

export const Task = dbConnection.define(
  'Task',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    minutes_to_complete: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_important: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: List,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);
