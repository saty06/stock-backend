import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database'; // Your Sequelize instance

export default class Holding extends Model {
  public holding_id!: number; // Primary key
  public set_data!: number;
  public percentage_change!: number;
  public user_id!: number | null;
  public stock_id!: number;
  public created_at!: Date;
  public updated_at!: Date;


  static associate(models: any) {
  }
}

Holding.init(
  {
    holding_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    set_data:{
      type:DataTypes.INTEGER,
      allowNull:false
         
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
    sequelize, // Sequelize instance
    modelName: 'Holding', // Model name
    schema: 'test', // Schema name

    timestamps: true, // Add `createdAt` and `updatedAt` fields
    underscored: true, // Use snake_case column names
  }
);
