import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUp } from '../entities/signup';
import { SignUpPersistanceGateway } from '../gateways/signup-persistance.gateway';

@Injectable()
export class SignUpMemoryAdapter implements SignUpPersistanceGateway {
  users: { name: string; email: string; password: string }[] = [
    {
      email: 'mock01@email.com',
      name: 'MockUser01',
      password: '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
    },
    {
      email: 'mock02@email.com',
      name: 'MockUser02',
      password: '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
    },
  ];

  async register(input: SignUp): Promise<void> {
    const { email, name, password } = input;

    const emailExists = this.users.find((value) => value.email === email);

    if (emailExists) {
      throw new BadRequestException(
        `Já existe um usuário cadastrado com o e-mail informado`,
      );
    }

    try {
      this.users.push({ email, name, password: password.getValue });
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar o usuário');
    }
  }

  findSignUpByEmail(email: string): any {
    return this.users.find((value) => value.email === email);
  }
}
