import { Inject, Injectable } from '@nestjs/common';
import { HashGateway } from '../gateways/hash-gateway.interface';
import { Request } from '../types/custom-types';
import { ChangeAccountPasswordInput } from './dtos/change-account-password.input';
import { ChangeAccountPassword } from './entities/change-account-password';
import { ChangeAccountPasswordPersistanceGateway } from './gateways/change-account-password-persistance-gateway.interface';

@Injectable()
export class ChangeAccountPasswordService {
  constructor(
    @Inject('ChangeAccountPasswordPersistanceGateway')
    private readonly persistanceGateway: ChangeAccountPasswordPersistanceGateway,
    @Inject('HashGateway')
    private readonly hashGateway: HashGateway,
  ) {}

  async changeAccountPassword(
    request: Request<ChangeAccountPasswordInput>,
  ): Promise<void> {
    const {
      input: { userId, currentPassword, newPassword },
    } = request;
    await this.persistanceGateway.changePassword(
      ChangeAccountPassword.create(
        this.hashGateway,
        userId,
        currentPassword,
        newPassword,
      ),
    );
  }
}
