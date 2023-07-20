import { Inject, Injectable } from '@nestjs/common';
import { Success } from 'src/dtos/success.dto';
import { PrismaRequest, PrismaResponse } from 'src/types/custom-types';
import { SignupInputInterface } from './dtos/signup-input.interface';
import * as bcrypt from 'bcrypt';
import { SignupPersistanceGatewayInterface } from './gateways/signup-gateway.interface';
import { SignupDTO } from './dtos/signup.dto';

@Injectable()
export class SignupService {
  constructor(@Inject('SignupPersistenceGateway') private readonly SignupGateway: SignupPersistanceGatewayInterface) {}

  async signup(request: PrismaRequest<SignupInputInterface>): Promise<void> {
    const { input } = request;
    const { email, name, password } = input;

    await this.SignupGateway.register(new SignupDTO(email, name, password));
  }
}
