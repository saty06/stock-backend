  /* eslint-disable @typescript-eslint/no-explicit-any */
  import HttpStatus from 'http-status-codes';
  import jwt from 'jsonwebtoken';
  import { Request, Response, NextFunction } from 'express';
  import dotenv from  'dotenv';
  dotenv.config();

  /**
   * Middleware to authenticate if user has a valid Authorization token
   * Authorization: Bearer <token>
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  export const userAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken) {
         res.status(400).json({ message: 'Authorization token is required' });
      }
  
      bearerToken = bearerToken.split(' ')[1];
  
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
  
      const decoded = jwt.verify(bearerToken, secretKey) as { id: number };
  
      if (!decoded || !decoded.id) {
         res.status(401).json({ message: 'Invalid or expired token' });
      }
      req.body = {...req.body, id:decoded.id} // Set the user ID in req.user
      console.log(req.body)
     
      next(); // 
    } catch (error) {
      next(error);
    }
  };
