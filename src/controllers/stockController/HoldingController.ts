import Stock from "../../models/stock/stock";
import  Jwt  from "jsonwebtoken";
import  doten from 'dotenv'
doten.config()
import { Request, Response, NextFunction } from "express";
import { child } from "winston";
import Holding from "../../models/holdeing/Holding";
class HoldingController {
    public  Holdingdata = async(req:Request, res:Response, next:NextFunction):Promise<any> =>{
      interface StockData {
        [ticker: string]: {
          price: string;
        };
      }

         // Data from frontend
      const token = req.headers.authorization?.split(' ')[1];
        
      if (!token) {
        return res.status(401).json({ message: 'Token is missing or invalid.' });
      }
      let {id}:any = Jwt.verify(token, process.env.JWT_SECRET) ;
      const holdingsData: StockData = req.body; // Example: { AAPL: { price: '89' }, MSFT: { price: '1000' } }

      try {
        const holdingEntries = Object.entries(holdingsData); // Converts object to array of [key, value]
      
        for (const [ticker, stockData] of holdingEntries) {
          
          const { price } = stockData;
  
          // Validate the required fields
          if (!price || isNaN(Number(price))) {
            return res.status(400).json({ message: `Invalid price for stock ${ticker}.` });
          }
  
          // Create a new holding record
          await Holding.create({
            ticker: ticker, // Default value
            set_data: price, // Default value
            user_id: id, // From the JWT token
            created_at: new Date(), // Optional, handled by Sequelize
            updated_at: new Date(), // Optional, handled by Sequelize
          });
        }
  

        


      
      return res.status(200).json({ message: 'Portfolio uploaded successfully.' });
        
      } catch (error) {
        console.error('Unexpected error:', error);
      return res.status(500).json({ message: 'Error processing stock portfolio.', error: error.message });
      }

    }
}
export default HoldingController