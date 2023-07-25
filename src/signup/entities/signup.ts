import { AccountPasswordDTO } from '../dtos/account-password.dto';

export class SignUp {
  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = new AccountPasswordDTO(password, 10);
  }

  email: string;
  name: string;
  password: AccountPasswordDTO;
}
