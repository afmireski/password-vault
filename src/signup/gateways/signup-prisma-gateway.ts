import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUp } from '../entities/signup';
import { SignupPersistanceGatewayInterface } from './signup-persistance-gateway.interface';

@Injectable()
export class SignupPrismaGateway implements SignupPersistanceGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: SignUp): Promise<void> {
    const { email, name, password } = input;

    const emailExists = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (emailExists) {
      throw new BadRequestException(
        `Já existe um usuário cadastrado com o e-mail informado`,
      );
    }

    await this.prisma.extension.user
      .create({
        data: {
          email,
          name,
          password: password.getValue,
        },
        select: {
          id: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException('Falha ao criar o usuário');
      });
  }
}
