"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const sequelize_1 = require("sequelize");
const Holding = database_1.default.define('Holding', {
    holding_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gain_loss: {
        type: sequelize_1.DataTypes.DECIMAL,
        defaultValue: 0,
    },
    percentage_change: {
        type: sequelize_1.DataTypes.DECIMAL,
        defaultValue: 0,
    },
    user_id: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    stock_id: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    schema: 'financeData',
    tableName: 'Holdings',
    timestamps: true,
});
exports.default = Holding;
