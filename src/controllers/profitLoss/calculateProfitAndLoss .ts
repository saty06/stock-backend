import Stock from "../../models/stock/stock";
import getStockPrice from "../../services/stockService/fetchPrice";
import sendEmail from "../../services/email/email";
import UserService from "../../services/user.service";
import HoldingService from "../../models/holdeing/HoldingService";
class calculateProfitAndLoss {
    public UserData = new UserService()
    // Calculate real-time gain/loss and percentage change
    public calculateProfitAndLoss = async () => {
        try {
          const stocks = await Stock.findAll(); // Get all stocks
          for (const stock of stocks) {
            const { ticker, buy_price, quantity, user_id } = stock;
      
            // Get the real-time price of the stock
            let getStockPriceData: any = await getStockPrice(ticker);
            let currentPrice : any = getStockPriceData?.price;
            if (currentPrice) {
              const profitLoss = (currentPrice - buy_price) * quantity;
              const percentageChange = (profitLoss / (buy_price * quantity)) * 100;
      
              console.log(`Stock: ${ticker}`);
              console.log(`Profit/Loss: ${profitLoss}`);
              console.log(`Percentage Change: ${percentageChange}%`);
      
              // Store the profit/loss and percentage change in the Holding table
              await HoldingService.create({
                user_id: user_id,
                stock_id: stock.id,
                set_data: profitLoss,
                percentage_change: percentageChange,
                ticker: ticker,
              });
      
              // Send email alert if the profit/loss exceeds a threshold
              if (Math.abs(percentageChange) >= 5) {  // Send alert for 5% gain or loss
                const user = await  this.UserData.getUser(user_id);  // Get user details to fetch the email
                if (user) {
                  await sendEmail(user.email, ticker, profitLoss, percentageChange,user_id );
                }
              }
            }
          }
        } catch (error) {
          console.error('Error calculating profit/loss:', error);
        }
      };
//  individual stock profit/losses:
    public calculatePortfolioProfitAndLoss = async (userId: number)=>{
        try{
         // Get all stocks for the user
    const stocks = await Stock.findAll({ where: { user_id: userId } });
    
    let totalProfitLoss = 0;
    let totalInvestment = 0;
    
    for (const stock of stocks) {
      const { ticker, buy_price, quantity } = stock;
      
      // Get the real-time price of the stock
      let getStockPriceData: any = await getStockPrice(ticker);
      let currentPrice : any = getStockPriceData?.price;
      
      if (currentPrice) {
        const profitLoss = (currentPrice - buy_price) * quantity;
        totalProfitLoss += profitLoss;
        totalInvestment += buy_price * quantity;
      }
    }

    // Calculate percentage change for the portfolio
    const portfolioPercentageChange = (totalProfitLoss / totalInvestment) * 100;

    console.log(`Total Portfolio Profit/Loss: ${totalProfitLoss}`);
    console.log(`Portfolio Percentage Change: ${portfolioPercentageChange}%`);

    // Store portfolio-level profit/loss in the database or send email alert if necessary
  } catch (error) {
    console.error('Error calculating portfolio profit/loss:', error);
  }

    
    }
}
export default calculateProfitAndLoss