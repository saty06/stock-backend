"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const sequelize_1 = require("sequelize");
const Alert = database_1.default.define('Alert', {
    alert_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    alert_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    threshold_percentage: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    email_sent: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    stock_id: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    }
});
exports.default = Alert;
