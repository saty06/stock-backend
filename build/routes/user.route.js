"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_validator_1 = __importDefault(require("../validators/user.validator"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const stock_1 = __importDefault(require("../models/stock/stock"));
const multer_1 = __importDefault(require("multer"));
const PortfolioController_1 = __importDefault(require("../controllers/stockController/PortfolioController"));
const HoldingController_1 = __importDefault(require("../controllers/stockController/HoldingController"));
class UserRoutes {
    constructor() {
        this.UserController = new user_controller_1.default();
        this.router = express_1.default.Router();
        this.UserValidator = new user_validator_1.default();
        this.PortController = new PortfolioController_1.default();
        this.HoldingData = new HoldingController_1.default();
        this.stock = stock_1.default;
        this.upload = (0, multer_1.default)({ dest: 'src/uploads/' });
        this.routes = () => {
            // Route to create a new user
            this.router.post('', this.UserController.newUser);
            // Route to get a single user by their id
            this.router.get('/:id', auth_middleware_1.userAuth, this.UserController.getUser);
            // Route to update a user by their id
            this.router.put('/:id', this.UserController.updateUser);
            // Route to upload stock portfolio
            // this.router.post('/upload-portfolio', async (req: Request, res: Response) => {
            //   try {
            //   const data = req.body; // data from frontend
            //   if (!Array.isArray(data) || data.length === 0) {
            //     return res.status(400).json({ message: 'Invalid data format' });
            //   }
            //   const header = data[0]; // First row with column names (['Ticker', 'Quantity', 'Buy'])
            //   const rows = data.slice(1); // All rows after the header
            //   const processedData = [];
            //   for (const row of rows){
            //     try {
            //       const [ticker, quantity, buy] = row;
            //       const price : any = await getStockPrice(ticker);
            //       if (price !== null) {
            //         processedData.push({
            //           ticker,
            //           quantity,
            //           buy,
            //           price,
            //           totalValue: price * parseInt(quantity), // Optional: calculate total value of stock (price * quantity)
            //         });
            //       }
            //       else {
            //         processedData.push({
            //           ticker,
            //           quantity,
            //           buy,
            //           price: 'N/A', // Stock not found
            //         });
            //       }
            //     } catch (error) {
            //       return res.status(500).json({ message: 'Error processing stock portfolio.', error: error.message });
            //     }
            //   }
            //  console.log("  process data from backedn ", processedData)
            //   return res.status(200).json({ message: 'Error processing stock portfolio.', data: processedData });
            //   } 
            //   catch (error: any) {
            //     console.error('Unexpected error:', error);
            //     return res.status(500).json({ message: 'Error processing stock portfolio.', error: error.message });
            //   }
            // });
            this.router.post('/upload-portfolio', this.PortController.uploadPortfolio);
            this.router.post('/upload-checkdata', this.HoldingData.Holdingdata);
            // Route to delete a user by their id
            this.router.delete('/:id', this.UserController.deleteUser);
        };
        this.getRoutes = () => {
            return this.router;
        };
        this.routes();
    }
}
exports.default = UserRoutes;
