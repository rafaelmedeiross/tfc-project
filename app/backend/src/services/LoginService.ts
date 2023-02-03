import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { tokenCreation } from '../auth/jwt';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';

class LoginService {
  constructor(private userModel = User) {}

  private errorMessage = 'Incorrect email or password';
  public async loginUser(login: ILogin): Promise<{ token?: string, message?: string }> {
    const { email, password } = login;
    const userExists = await this.findUser(email);
    if (!userExists) {
      return { message: this.errorMessage };
    }
    const { password: hashFromDb } = userExists;
    if (bcrypt.compareSync(password, hashFromDb)) {
      const token = tokenCreation({ email });
      return { token };
    }
    return { message: this.errorMessage };
  }

  private async findUser(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  public async validateLogin(email: string): Promise<{ role: string, message?: string }> {
    try {
      const userExists = await this.findUser(email);
      if (userExists) {
        const { role } = userExists;
        return { role };
      }
      throw new Error(this.errorMessage);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default LoginService;
