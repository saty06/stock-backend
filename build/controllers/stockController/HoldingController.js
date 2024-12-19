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
Object.defineProperty(exports, "__esModule", { value: true });
class HoldingController {
    constructor() {
        this.Holdingdata = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Data from frontend
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token is missing or invalid.' });
            }
            const data = req.body;
            try {
                console.log(data);
                return res.status(200).json({ message: 'Portfolio uploaded successfully.', data: data });
            }
            catch (error) {
                console.error('Unexpected error:', error);
                return res.status(500).json({ message: 'Error processing stock portfolio.', error: error.message });
            }
        });
    }
}
exports.default = HoldingController;
