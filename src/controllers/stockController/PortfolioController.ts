import { Request, Response } from 'express';
import getStockPrice from '../../services/stockService/fetchPrice'; // Import your stock price fetching logic
import Stock from '../../models/stock/stock';
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv';
import user from '../../models/user';
dotenv.config()
 class PortfolioController {
  // Method to handle the upload-portfolio route
  public  uploadPortfolio  = async (req: Request, res: Response): Promise<Response> => {
    try {
       // Data from frontend
      const token = req.headers.authorization?.split(' ')[1];
        
      if (!token) {
        return res.status(401).json({ message: 'Token is missing or invalid.' });
      }
      const data = req.body;
      let {id}: any = JWT.verify(token, process.env.JWT_SECRET);
        
      if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: 'Invalid data format' });
      }

      const header:any = data[0]; // First row with column names (['Ticker', 'Quantity', 'Buy'])
      const rows:any = data.slice(1); // All rows after the header
      let result:any = []

      const processedData = [];
      for (const row of rows) {
        try {
          const [ticker, quantity, buy] = row;
          const price: any = await getStockPrice(ticker); // Fetch stock price
          if (price !== null) {
            processedData.push({
              ticker,
              quantity,
              buy,
              price,
              totalValue: price * parseInt(quantity), // Optional: calculate total value of stock (price * quantity)
            });
            let data = await Stock.create({
              ticker:ticker,
              company_name:"test",
              user_id: id,
              quantity: quantity,
              buy_price:buy,
              current_price:price?.price
            })
           result.push(data);
          } else {
            processedData.push({
              ticker,
              quantity,
              buy,
              price: 'N/A', // Stock not found
            });
          }
        } catch (error) {
          console.error('Error processing stock row:', error);
          return res.status(500).json({ message: 'Error processing stock portfolio.', error: error.message });
        }
      }
     
      console.log("Processed data from backend:", processedData);
      

      return res.status(200).json({ message: 'Portfolio uploaded successfully.', data: processedData });
    } catch (error: any) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Error processing stock portfolio.', error: error.message });
    }
  }
}
export default PortfolioController