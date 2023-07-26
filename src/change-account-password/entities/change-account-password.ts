import { AccountPassword } from '../../signup/dtos/account-password.dto';
import * as validator from 'class-validator';
import { HashGateway } from '../../gateways/hash-gateway.interface';

export class ChangeAccountPassword {
  userId: string;

  oldPassword: string;

  newPassword: AccountPassword;

  constructor(
    userId: string,
    oldPassword: string,
    newPassword: AccountPassword,
  ) {
    this.userId = userId;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

  static create(
    hashGateway: HashGateway,
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): ChangeAccountPassword {
    const isUserIdValid =
      validator.isUUID(userId, '4') && validator.isNotEmpty(userId);

    if (!isUserIdValid) {
      throw new Error('O id do usuário não é válido');
    }

    const isOldPasswordValid =
      validator.minLength(oldPassword, 6) && validator.isNotEmpty(oldPassword);

    if (!isOldPasswordValid) {
      throw new Error('A senha antiga não está num formato válido');
    }

    return new ChangeAccountPassword(
      userId,
      oldPassword,
      AccountPassword.create(hashGateway, newPassword, 10),
    );
  }
}
