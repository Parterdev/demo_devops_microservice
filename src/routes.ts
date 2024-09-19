import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { checkApiKey, checkJWT } from './auth';

const routes = Router();

routes.get('/generate-token', (req: Request, res: Response) => {
  const token = jwt.sign({ user: 'testUser' }, process.env.SECRET_KEY || 'your_secret_key', { expiresIn: '1h' });
  res.json({ token });
});

routes.post('/DevOps', checkApiKey, checkJWT, (req: Request, res: Response) => {
  const { message, to, from, timeToLifeSec } = req.body;

  if (!message || !to || !from || !timeToLifeSec) {
    return res.status(400).send('ERROR: Missing required fields');
  }

  res.json({
    message: `Hello ${to} your message will be send`
  });
});

routes.all('/DevOps', (req: Request, res: Response) => {
  res.send('ERROR');
});

export { routes };