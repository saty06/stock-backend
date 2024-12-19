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
const stock_1 = __importDefault(require("../../models/stock/stock"));
function HoldingStockData() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
class StockService {
    constructor() {
        this.StoreStock = (stocks, user_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Using for...of for asynchronous operations
                for (const stock of stocks) {
                    yield stock_1.default.create({
                        ticker: stock.ticker,
                        company_name: stock.company_name,
                        user_id: user_id,
                        quantity: stock.quantity,
                        buy_price: stock.buy_price,
                        created_at: new Date(), // Optionally pass the current date if not provided
                    });
                }
                console.log("Stocks have been successfully stored.");
                return " store data in database";
            }
            catch (error) {
                console.error("Error storing stocks:", error);
                return null;
            }
        });
    }
}
exports.default = StockService;
