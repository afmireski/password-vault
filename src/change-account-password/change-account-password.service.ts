import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ChangeAccountPasswordService {
  constructor(
    @Inject('ChangeAccountPasswordPersistanceGateway')
    private readonly persistanceGateway: ChangeAccountPasswordPersistanceGateway,
  ) {}
}
