import { AccountPassword } from '../../signup/dtos/account-password.dto';
import * as validator from 'class-validator';
import { HashGateway } from '../../gateways/hash.gateway';

export class ChangeAccountPassword {
  userId: string;

  currentPassword: string;

  newPassword: AccountPassword;

  private constructor(
    userId: string,
    currentPassword: string,
    newPassword: AccountPassword,
  ) {
    this.userId = userId;
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }

  static create(
    hashGateway: HashGateway,
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): ChangeAccountPassword {
    const isUserIdValid =
      validator.isUUID(userId, '4') && validator.isNotEmpty(userId);

    if (!isUserIdValid) {
      throw new Error('O id do usuário não é válido');
    }

    const isOldPasswordValid = currentPassword.length >= 6;

    if (!isOldPasswordValid) {
      throw new Error('A senha atual não está num formato válido');
    }

    return new ChangeAccountPassword(
      userId,
      currentPassword,
      AccountPassword.create(hashGateway, newPassword, 10),
    );
  }
}
