import User from '../database/models/User';
import { tokenCreation } from '../auth/jwt';
import Login from '../interfaces/LoginInterface';

class LoginService {
  constructor(private userModel = User) {}

  public async loginUser(login: Login): Promise< { token?: string, message?: string } > {
    const userExists = await this.findUser(login);
    console.log(userExists);
    const { email } = login;
    if (userExists) {
      const token = tokenCreation({ email });
      return { token };
    }
    return { message: 'Incorrect email or password' };
  }

  private async findUser(login: Login) {
    const { email } = login;
    const user = await this.userModel.findOne({ where: { email } });
    if (user) return true;
    return false;
  }
}

export default LoginService;
