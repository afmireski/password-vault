import { Injectable } from '@nestjs/common';
import { ChangeAccountPassword } from '../entities/change-account-password';
import * as bcrypt from 'bcrypt';
import { ChangeAccountPasswordPersistanceGateway } from '../gateways/change-account-password-persistance.gateway';

@Injectable()
export class ChangeAccountPasswordMemoryAdapter
  implements ChangeAccountPasswordPersistanceGateway
{
  private accounts: Account[] = [
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

  findAccount(userId: string): Account {
    return this.accounts.find((element) => element.id === userId);
  }
}

type Account = {
  id: string;
  password: string;
};
