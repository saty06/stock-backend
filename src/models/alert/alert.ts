// models/alert/Alert.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database'; // Your Sequelize instance

export default class Alert extends Model {
  public alert_id!: number;
  public alert_type!: string;
  public threshold_percentage!: number;
  public email_sent!: boolean;
  public stock_id!: number;
  public user_id!: number;
  
  static associate(models: any) {
    // Define associations here if necessary
  }
}

// Initialize the Alert model
Alert.init(
  {
    alert_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alert_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    threshold_percentage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    email_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'alert',
    schema: 'test', // Define the schema if applicable
    timestamps: true,
    underscored: true,
  }
);
