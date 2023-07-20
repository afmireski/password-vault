import { Injectable } from '@nestjs/common';
import { Success } from 'src/dtos/success.dto';
import { PrismaRequest, PrismaResponse } from 'src/types/custom-types';
import { SignupInputInterface } from './dtos/signup-input.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignupService {
  async signup(
    request: PrismaRequest<SignupInputInterface>,
  ): PrismaResponse<Success> {
    const { input, select } = request;
    const { email, name, password } = input;

    const salt = bcrypt.genSaltSync(10);

    return Promise.resolve(
      this.prisma.user.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      }),
    )
      .then((user) => {
        if (user) {
          throw new BadRequestException(
            `Já existe um usuário com o email: ${email}.`,
          );
        }

        return this.prisma.extension.user.create({
          data: {
            email,
            name,
            password: bcrypt.hashSync(password, salt),
          },
          ...select,
        });
      })
      .catch(() => {
        throw new InternalServerErrorException('Falha ao criar o usuário');
      });
  }
}
