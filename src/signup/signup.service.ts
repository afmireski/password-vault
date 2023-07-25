import { Inject, Injectable } from '@nestjs/common';
import { SignUpInputInterface } from './dtos/signup-input.interface';
import { SignUp } from './entities/signup';
import { SignupPersistanceGatewayInterface } from './gateways/signup-gateway.interface';

@Injectable()
export class SignupService {
  constructor(
    @Inject('SignupPersistenceGateway')
    private readonly signupGateway: SignupPersistanceGatewayInterface,
  ) {}

  async signup(request: SignUpInputInterface): Promise<void> {
    const { email, name, password } = request;

    await this.signupGateway.register(new SignUp(email, name, password));
  }
}
