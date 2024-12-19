import cron from 'node-cron';
import calculateProfitAndLoss from '../../controllers/profitLoss/calculateProfitAndLoss ';
class StockService {
    private profitLossService = new calculateProfitAndLoss();
  
    // Method to calculate profit/loss for all stocks
    public async calculateStocksProfitLoss() {
      return await this.profitLossService.calculateProfitAndLoss();
    }
  
    // Method to calculate portfolio profit/loss for a user
//     public async calculateUserPortfolioProfitLoss(userId: number) {
//       return await this.profitLossService.calculatePortfolioProfitAndLoss(userId);
//     }
//   }
}