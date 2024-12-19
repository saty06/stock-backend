// import sequelize from "../../config/database";
// import { DataTypes } from 'sequelize';

// const Stock = sequelize.define('stock', {
//   ticker: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   company_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   buy_price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   current_price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   created_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   schema: 'test',
//   ///financeData     // Schema should be defined here
// });

// export default Stock;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database'; // Import your Sequelize instance

export default class Stock extends Model {
  public ticker!: string;
  public company_name!: string;
  public user_id!: number;
  public quantity!: number;
  public buy_price!: number;
  public current_price!: number;
  public created_at!: Date;
  public updated_at!: Date; 
  public id ?:Number 

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // Define associations here
    // Example: Stock.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

// Initialize the Stock model
Stock.init(
  {
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buy_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    current_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'stock', // Name of the model
    schema: 'test', // Schema name
  // Table name in the database
    timestamps: true, // Automatically add createdAt and updatedAt fields
    underscored: true, // Use snake_case for database column names
  }
);

