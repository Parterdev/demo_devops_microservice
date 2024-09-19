import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY || '';

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header('X-Parse-REST-API-Key');
  if (apiKey !== API_KEY) {
    return res.status(403).send('ERROR: Invalid API Key');
  }
  next();
}

export function checkJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('X-JWT-KWY');
  if (!token) {
    return res.status(403).send('ERROR: No JWT provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'your_secret_key') as object;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send('ERROR: Invalid JWT');
  }
}