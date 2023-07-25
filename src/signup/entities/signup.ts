import { AccountPassword } from '../dtos/account-password.dto';
import { HashGateway } from '../gateways/hash-gateway.interface';

export class SignUp {
  constructor(
    hashGateway: HashGateway,
    email: string,
    name: string,
    password: string,
  ) {
    this.email = email;
    this.name = name;
    this.password = AccountPassword.create(hashGateway, password, 10);
  }

  email: string;
  name: string;
  password: AccountPassword;
}
