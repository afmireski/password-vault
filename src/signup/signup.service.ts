import { Inject, Injectable } from '@nestjs/common';
import { SignUpInputInterface } from './dtos/signup-input.interface';
import { SignUp } from './entities/signup';
import { HashGateway } from './gateways/hash-gateway.interface';
import { SignupPersistanceGatewayInterface } from './gateways/signup-persistance-gateway.interface';

@Injectable()
export class SignupService {
  constructor(
    @Inject('SignupPersistenceGateway')
    private readonly signupGateway: SignupPersistanceGatewayInterface,
    @Inject('SignupHashGateway')
    private readonly hashGateway: HashGateway,
  ) {}

  async signUp(request: SignUpInputInterface): Promise<void> {
    const { email, name, password } = request;

    await this.signupGateway.register(
      SignUp.create(this.hashGateway, email, name, password),
    );
  }
}
