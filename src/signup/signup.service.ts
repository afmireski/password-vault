import { Inject, Injectable } from '@nestjs/common';
import { SignupInputInterface } from './dtos/signup-input.interface';
import { Signup } from './entities/signup';
import { SignupPersistanceGatewayInterface } from './gateways/signup-gateway.interface';

@Injectable()
export class SignupService {
  constructor(
    @Inject('SignupPersistenceGateway')
    private readonly signupGateway: SignupPersistanceGatewayInterface,
  ) {}

  async signup(request: SignupInputInterface): Promise<void> {
    const { email, name, password } = request;

    await this.signupGateway.register(new Signup(email, name, password));
  }
}
