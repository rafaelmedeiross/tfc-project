import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public loginUser = async (req: Request, res: Response) => {
    const login = req.body;
    const feedback = await this.loginService.loginUser(login);
    if (feedback.message) return res.status(401).json(feedback);
    res.status(200).json(feedback);
  };

  public validateLogin = async (req: Request, res: Response) => {
    const { email } = req.body.loggedUser;
    const feedback = await this.loginService.validateLogin(email);
    if (feedback.message) return res.status(401).json(feedback);
    res.status(200).json(feedback);
  };
}

export default LoginController;
