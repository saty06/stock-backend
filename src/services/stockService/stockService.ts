import Stock from "../../models/stock/stock";
import Holding from "../../models/holdeing/Holding";

async function HoldingStockData() {
    
}
class StockService {
    public StoreStock = async (stocks: any, user_id:any) => {
        try {
         
            // Using for...of for asynchronous operations
            for (const stock of stocks) {
                await Stock.create({
                    ticker: stock.ticker,
                    company_name: stock.company_name,
                    user_id: user_id,
                    quantity:stock.quantity,
                    buy_price:stock.buy_price,
                    created_at:  new Date().getDay(), // Optionally pass the current date if not provided
                });
            }
            
            console.log("Stocks have been successfully stored.");
            return " store data in database"
        } catch (error) {
           
            console.error("Error storing stocks:", error);
            return null
        }
    };
}

export default StockService;
