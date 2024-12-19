import express, { IRouter, Request, Response } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import Stock from '../models/stock/stock';
import multer from 'multer';

import PortfolioController from '../controllers/stockController/PortfolioController';
import HoldingController from '../controllers/stockController/HoldingController';
import calculateProfitAndLoss from '../controllers/profitLoss/calculateProfitAndLoss ';
class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();
  private PortController = new PortfolioController()
  private HoldingData = new HoldingController()
  public profitLossService = new calculateProfitAndLoss();

  public stock = Stock;
  public upload = multer({ dest: 'src/uploads/' });

  constructor() {
    this.routes();
  }

  private routes = () => {

    // Route to create a new user
    this.router.post('', this.UserController.newUser);

    // Route to get a single user by their id
    this.router.get('/:id', userAuth, this.UserController.getUser);

    // Route to update a user by their id
    this.router.put('/:id', this.UserController.updateUser);

   
   

          
    
      
      
   
    this.router.post('/upload-portfolio', this.PortController.uploadPortfolio)
    this.router.post('/upload-checkdata', this.HoldingData.Holdingdata);
    //  calculate profit/loss for all stocks
    // this.router.get('/calculate-profit-loss', this.profitLossService.calculateProfitAndLoss)
    // hold some time 
    this.router.post('/calculate-profit-loss', userAuth, async (req: Request, res: Response) => {
    
    
      try {
        await this.profitLossService.calculateProfitAndLoss();
        res.status(200).json({ message: 'Portfolio profit and loss calculation completed.' });
      } catch (error) {
        console.error('Error calculating portfolio profit/loss:', error);
        res.status(500).json({ message: 'Error calculating portfolio profit/loss.' });
      }
    });

    this.router.post('/calculate-portfolio-profit-loss', userAuth, async (req: Request, res: Response) => {
      const userId = req.body?.id;
      
      console.log('User ID:', userId);

      if (!userId || isNaN(Number(userId))) {
        return res.status(400).json({ message: 'Valid User ID is required.' });
      }
      console.log('User ID:', userId);
      console.log('Request body:', req.body);
    
      if (!userId || isNaN(Number(userId))) {
        return res.status(400).json({ message: 'Valid User ID is required.' });
      }
    
      try {
        await this.profitLossService.calculatePortfolioProfitAndLoss(Number(userId));
        res.status(200).json({ message: 'Portfolio profit and loss calculation completed.' });
      } catch (error) {
        console.error('Error calculating portfolio profit/loss:', error);
        res.status(500).json({ message: 'Error calculating portfolio profit/loss.' });
      }
    });
    
    // Route to delete a user by their id
    this.router.delete('/:id', this.UserController.deleteUser);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
