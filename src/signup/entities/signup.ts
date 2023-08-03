import * as Validator from 'class-validator';
import { HashGateway } from 'src/gateways/hash.gateway';
import { AccountPassword } from '../dtos/account-password.dto';

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
    const isEmailValid =
      Validator.isEmail(email) && Validator.isNotEmpty(email);

    const isNameValid =
      Validator.length(name, 3, 100) && Validator.isNotEmpty(name);

    const isPasswordValid = password.length >= 6;

    if (!isEmailValid) {
      throw new Error('O endereço de e-mail não é válido');
    } else if (!isNameValid) {
      throw new Error('O nome deve ter entre 3 e 100 caracteres');
    } else if (!isPasswordValid) {
      throw new Error('A senha deve possuir no mínimo 6 caracteres');
    }

    return new SignUp(
      email,
      name,
      AccountPassword.create(hashGateway, password, 10),
    );
  }
}
