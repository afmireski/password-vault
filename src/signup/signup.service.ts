import { Inject, Injectable } from '@nestjs/common';
import { PrismaRequest } from 'src/types/custom-types';
import { SignupInputInterface } from './dtos/signup-input.interface';
import { SignupDTO } from './dtos/signup.dto';
import { SignupPersistanceGatewayInterface } from './gateways/signup-gateway.interface';

@Injectable()
export class SignupService {
  constructor(@Inject('SignupPersistenceGateway') private readonly signupGateway: SignupPersistanceGatewayInterface) {}

  async signup(request: SignupInputInterface): Promise<void> {
    const { email, name, password } = request;

    await this.signupGateway.register(new SignupDTO(email, name, password));
  }
}
