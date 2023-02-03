import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { tokenCreation } from '../auth/jwt';
import ILogin from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';

class LoginService {
  constructor(private userModel = User) {}

  public async loginUser(login: ILogin): Promise<{ token?: string, message?: string }> {
    const userExists = await this.findUser(login);
    if (!userExists) {
      return { message: 'Incorrect email or password' };
    }
    const { email, password } = login;
    const { password: hashFromDb } = userExists;
    if (bcrypt.compareSync(password, hashFromDb)) {
      const token = tokenCreation({ email });
      return { token };
    }
    return { message: 'Incorrect email or password' };
  }

  private async findUser(login: ILogin): Promise<IUser | null> {
    const { email } = login;
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }
}

export default LoginService;
