import { Injectable } from '@nestjs/common';
import { ChangeAccountPassword } from '../entities/change-account-password';
import { ChangeAccountPasswordPersistanceGateway } from './change-account-password-persistance-gateway.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangeAccountPasswordMemoryGateway
  implements ChangeAccountPasswordPersistanceGateway
{
  accounts: Account[] = [
    {
      id: '70cd1369-e7f1-4167-a267-5639912ecc2d',
      password: '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
    },
  ];

  async changePassword(input: ChangeAccountPassword): Promise<void> {
    const { userId, currentPassword, newPassword } = input;

    const i = this.accounts.findIndex((element) => element.id === userId);

    if (i === -1) {
      new Error('Usuário não encontrado!');
    }

    const user = this.accounts[i];

    if (!bcrypt.compareSync(currentPassword, user.password)) {
      new Error('Credenciais inválidas!');
    }

    this.accounts[i].password = newPassword.getValue;
  }
}

type Account = {
  id: string;
  password: string;
};
