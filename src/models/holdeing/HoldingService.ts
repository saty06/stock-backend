// models/holding/Holding.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database'; // Import your Sequelize instance

export default class HoldingService  extends Model {
  public id?: number;
  public user_id!: number;
  public stock_id!: number;
  public set_data!: number; // Profit/Loss value
  public percentage_change!: number; // Percentage change in the stock
  public ticker!: string;
  public created_at!: Date;
  public updated_at!: Date;

  static associate(models: any) {
    // Define associations here
    // Example: Holding.belongsTo(models.Stock, { foreignKey: 'stock_id' });
  }
}

// Initialize the Holding model
HoldingService .init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    set_data: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    percentage_change: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ticker: {
      type: DataTypes.STRING,
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
    sequelize,
    modelName: 'holdingservice ', // Table name for the model
    schema: 'test', // Schema name
    timestamps: true, // Automatically adds createdAt and updatedAt
    underscored: true, // Use snake_case for column names
  }
);
