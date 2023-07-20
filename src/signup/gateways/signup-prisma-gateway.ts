import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupInputInterface } from '../dtos/signup-input.interface';
import { SignupDTO } from '../dtos/signup.dto';
import { SignupGatewayInterface } from './signup-gateway.interface';

@Injectable()
export class SignupPrismaGateway implements SignupGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async register(input: SignupDTO): Promise<void> {
    const { email, name, password } = input;

    const emailsExists = this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (emailsExists) {
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
