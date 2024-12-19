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
const stockService_1 = __importDefault(require("../../services/stockService/stockService"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class StockController {
    constructor() {
        this.stockservice = new stockService_1.default();
        this.creteStockController = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let body = req.body;
                let user_id = req.body;
                let data = yield this.stockservice.StoreStock(body, user_id);
                if (!data) {
                    res.status(http_status_codes_1.default.BAD_REQUEST).json({
                        code: http_status_codes_1.default.BAD_REQUEST,
                        message: " something wrong",
                    });
                }
                res.status(http_status_codes_1.default.ACCEPTED).json({
                    code: http_status_codes_1.default.ACCEPTED,
                    message: "data store in database",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = StockController;
