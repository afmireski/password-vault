import { AccountPasswordDTO } from '../dtos/account-passoword.dto';

export class Signup {
  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = new AccountPasswordDTO(password, 10);
  }

  email: string;
  name: string;
  password: AccountPasswordDTO;
}
