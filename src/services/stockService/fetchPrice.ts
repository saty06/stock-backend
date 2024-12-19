import axios from "axios";

const getStockPrice = async (ticker) => {
  const API_KEY = 'EKKT6K5DV5XCYQQ3';  
  const API_URL = 'https://www.alphavantage.co/query';

  try {
    const response = await axios.get(`${API_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`);
    
   console.log(" data from ticker ",response)
    if (response.data['Global Quote']) {
      const stockData = response.data['Global Quote'];
      const price = stockData['05. price'];  
      const change = stockData['10. change percent'];  
      const previousClose = stockData['08. previous close']; 

      console.log(`Stock Ticker: ${ticker}`);
      console.log(`Current Price: $${price}`);
      console.log(`Change: ${change}`);
      console.log(`Previous Close: $${previousClose}`);

      return { price, change, previousClose };
    } else {
      console.log('Error: Unable to fetch stock data.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
};


export  default getStockPrice;
