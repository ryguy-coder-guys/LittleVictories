import { DataTypes, Optional, Model } from 'sequelize';
import { dbConnection } from '..';

interface UserInstance extends Model {
  id: string;
  fName: string;
  lName: string;
  createdAt: Date;
  updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// interface UserInstance
//   extends Model<UserAttributes, UserCreationAttributes>,
//     UserAttributes {}

export const User = dbConnection.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
