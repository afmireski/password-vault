import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../prisma/@generated/user/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dtos/create-user.input';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    const input: CreateUserInput = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    const select = {
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    };

    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });

    it('should create a user', async () => {
      const user: Partial<User> = {
        id: 'eb9737d3-f69e-46c8-92a6-906105097271',
        name: 'John Doe',
        email: 'johndoe@email.com',
        created_at: new Date(),
      };

      prisma.extension.user.create = jest.fn().mockResolvedValue(user);

      const result = await service.createUser(input, select);

      expect(result).toEqual(user);
      expect(prisma.extension.user.create).toHaveBeenCalledWith({
        data: {
          email: input.email,
          name: input.name,
        },
        ...select,
      });
    });

    it('should throw InternalServerErrorException because already exists a user with the email: johndoe@email.com', async () => {
      prisma.extension.user.create = jest
        .fn()
        .mockRejectedValue(
          new InternalServerErrorException('Falha ao criar o usuário'),
        );

      await expect(service.createUser(input, select)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(prisma.extension.user.create).toHaveBeenCalledWith({
        data: {
          email: input.email,
          name: input.name,
        },
        ...select,
      });
    });
  });

  describe('findUser', () => {
    it('should be defined', () => {
      expect(service.findUser).toBeDefined();
    });

    it('should return the user when found', async () => {
      const userId = 'eb9737d3-f69e-46c8-92a6-906105097271';
      const select = {
        select: {
          id: true,
          name: true,
          email: true,
        },
      };
      const user: User = {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@email.com',
        categories: [],
        passwords: [],
        password: '123456',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
        _count: null,
      };

      prisma.user.findFirstOrThrow = jest.fn().mockResolvedValue(user);

      const result = await service.findUser({
        input: { user_id: userId },
        select,
      });

      expect(result).toEqual(user);
      expect(prisma.user.findFirstOrThrow).toHaveBeenCalledWith({
        where: {
          id: { equals: userId },
        },
        ...select,
      });
    });

    it('should throw NotFoundException when user is not found', async () => {
      const userId = 'eb9737d3-f69e-46c8-92a6-906105097271';

      prisma.user.findFirstOrThrow = jest
        .fn()
        .mockRejectedValue(new NotFoundException('Usuário não encontrado'));

      await expect(
        service.findUser({ input: { user_id: userId }, select: {} }),
      ).rejects.toThrowError(NotFoundException);
      expect(prisma.user.findFirstOrThrow).toHaveBeenCalledWith({
        where: {
          id: { equals: userId },
        },
      });
    });
  });
});
