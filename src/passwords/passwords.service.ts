import { Injectable } from '@nestjs/common';
import { PrismaRequest } from 'src/types/custom-types';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePasswordInput } from './dtos/create-password.input';

@Injectable()
export class PasswordsService {
    constructor(prisma: PrismaService) {}

    async createPassword(request: PrismaRequest<CreatePasswordInput>): PrismaRequest<>
}
