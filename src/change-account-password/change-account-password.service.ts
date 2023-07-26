import { Inject, Injectable } from '@nestjs/common';
import { ChangeAccountPasswordPersistanceGateway } from './gateways/change-account-passwotd-persistance-gateway.interface';

@Injectable()
export class ChangeAccountPasswordService {
  constructor(
    @Inject('ChangeAccountPasswordPersistanceGateway')
    private readonly persistanceGateway: ChangeAccountPasswordPersistanceGateway,
  ) {}

  async changeAccountPassword(input: ChangeAccountPasswordInput): Promise<void> {
    return;
  }
}
