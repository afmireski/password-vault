import { Inject, Injectable } from '@nestjs/common';
import { HashGateway } from '../gateways/hash.gateway';
import { SignUpInputInterface } from './dtos/signup-input.interface';
import { SignUp } from './entities/signup';
import { SignUpPersistanceGateway } from './gateways/signup-persistance.gateway';

@Injectable()
export class SignupService {
  constructor(
    @Inject('SignupPersistenceGateway')
    private readonly signupGateway: SignUpPersistanceGateway,
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
