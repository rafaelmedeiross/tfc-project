import { Request, Response, NextFunction } from 'express';

const verifier = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const message = 'All fields must be filled';
  if (!email || !password) return res.status(400).json({ message });
  next();
};

export default verifier;
