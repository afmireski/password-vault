import { AccountPassword } from '../dtos/account-password.dto';
import { HashGateway } from '../gateways/hash-gateway.interface';

export class SignUp {
  private constructor(email: string, name: string, password: AccountPassword) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  email: string;
  name: string;
  password: AccountPassword;

  static create(
    hashGateway: HashGateway,
    email: string,
    name: string,
    password: string,
  ): SignUp {
    return new SignUp(
      email,
      name,
      AccountPassword.create(hashGateway, password, 10),
    );
  }
}
