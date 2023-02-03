import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || 'jwt_secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const tokenCreation = (payload: object) => jwt
  .sign(payload, secret, <object> jwtConfig);

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const loggedUser = jwt.verify(token, secret);
    req.body.loggedUser = loggedUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
