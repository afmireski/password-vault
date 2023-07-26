import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'src/types/custom-types';
import { ChangeAccountPasswordInput } from './dtos/change-account-password.input';
import { ChangeAccountPassword } from './entities/change-account-password';
import { ChangeAccountPasswordPersistanceGateway } from './gateways/change-account-passwotd-persistance-gateway.interface';

@Injectable()
export class ChangeAccountPasswordService {
  constructor(
    @Inject('ChangeAccountPasswordPersistanceGateway')
    private readonly persistanceGateway: ChangeAccountPasswordPersistanceGateway,
  ) {}

  async changeAccountPassword(
    request: Request<ChangeAccountPasswordInput>,
  ): Promise<void> {
    const {
      input: { userId, currentPassword, newPassword },
    } = request;
    await this.persistanceGateway.changePassword(
      new ChangeAccountPassword(userId, currentPassword, newPassword),
    );
  }
}
