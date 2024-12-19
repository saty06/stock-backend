"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const sequelize_1 = require("sequelize");
const Stock = database_1.default.define('Stock', {
    ticker: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    company_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    buy_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    current_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    schema: 'financeData', // Schema should be defined here
});
exports.default = Stock;
