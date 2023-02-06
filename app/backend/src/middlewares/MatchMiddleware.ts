import { Request, Response, NextFunction } from 'express';

const matchVerifier = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const message = 'It is not possible to create a match with two equal teams';
  if (homeTeamId === awayTeamId) return res.status(422).json({ message });
  next();
};

export default matchVerifier;
