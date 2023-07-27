import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeAccountPassword } from '../entities/change-account-password';
import { ChangeAccountPasswordPersistanceGateway } from './change-account-password-persistance-gateway.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangeAccountPasswordPrismaGateway
  implements ChangeAccountPasswordPersistanceGateway
{
  constructor(private readonly prisma: PrismaService) {}

  async changePassword(input: ChangeAccountPassword): Promise<void> {
    const { userId, currentPassword, newPassword } = input;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        deleted_at: null,
      },
      select: {
        password: true,
      },
    });

    if (!user) {
      new Error('Usuário não encontrado!');
    }

    if (!bcrypt.compareSync(currentPassword, user.password)) {
      new Error('Credenciais inválidas!');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword.getValue,
      },
      select: {
        id: true,
      },
    });
  }
}
