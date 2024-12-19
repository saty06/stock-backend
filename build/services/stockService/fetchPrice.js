"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getStockPrice = (ticker) => __awaiter(void 0, void 0, void 0, function* () {
    const API_KEY = 'L29FREDDQTZOPI2G';
    const API_URL = 'https://www.alphavantage.co/query';
    try {
        const response = yield axios_1.default.get(`${API_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`);
        console.log(" data from ticker ", response);
        if (response.data['Global Quote']) {
            const stockData = response.data['Global Quote'];
            const price = stockData['05. price'];
            const change = stockData['10. change percent'];
            const previousClose = stockData['08. previous close'];
            console.log(`Stock Ticker: ${ticker}`);
            console.log(`Current Price: $${price}`);
            console.log(`Change: ${change}`);
            console.log(`Previous Close: $${previousClose}`);
            return { price, change, previousClose };
        }
        else {
            console.log('Error: Unable to fetch stock data.');
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching stock price:', error);
        return null;
    }
});
exports.default = getStockPrice;
