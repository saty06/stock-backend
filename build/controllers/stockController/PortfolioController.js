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
const fetchPrice_1 = __importDefault(require("../../services/stockService/fetchPrice")); // Import your stock price fetching logic
const stock_1 = __importDefault(require("../../models/stock/stock"));
class PortfolioController {
    constructor() {
        // Method to handle the upload-portfolio route
        this.uploadPortfolio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Data from frontend
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ message: 'Token is missing or invalid.' });
                }
                const data = req.body;
                if (!Array.isArray(data) || data.length === 0) {
                    return res.status(400).json({ message: 'Invalid data format' });
                }
                const header = data[0]; // First row with column names (['Ticker', 'Quantity', 'Buy'])
                const rows = data.slice(1); // All rows after the header
                let result = [];
                const processedData = [];
                for (const row of rows) {
                    try {
                        const [ticker, quantity, buy] = row;
                        const price = yield (0, fetchPrice_1.default)(ticker); // Fetch stock price
                        if (price !== null) {
                            // processedData.push({
                            //   ticker,
                            //   quantity,
                            //   buy,
                            //   price,
                            //   totalValue: price * parseInt(quantity), // Optional: calculate total value of stock (price * quantity)
                            // });
                            let data = yield stock_1.default.create({
                                ticker: ticker,
                                company_name: "test",
                                user_id: 123,
                                quantity: quantity,
                                buy_price: buy,
                                current_price: price === null || price === void 0 ? void 0 : price.price
                            });
                            result.push(data);
                        }
                        else {
                            processedData.push({
                                ticker,
                                quantity,
                                buy,
                                price: 'N/A', // Stock not found
                            });
                        }
                    }
                    catch (error) {
                        console.error('Error processing stock row:', error);
                        return res.status(500).json({ message: 'Error processing stock portfolio.', error: error.message });
                    }
                }
                console.log("Processed data from backend:", processedData);
                return res.status(200).json({ message: 'Portfolio uploaded successfully.', data: result });
            }
            catch (error) {
                console.error('Unexpected error:', error);
                return res.status(500).json({ message: 'Error processing stock portfolio.', error: error.message });
            }
        });
    }
}
exports.default = PortfolioController;
