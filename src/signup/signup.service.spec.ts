import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HashMockedGateway } from 'src/gateways/hash-mocked-gateway';
import { SignUpInputInterface } from './dtos/signup-input.interface';
import { SignUpMemoryGateway } from './gateways/signup-memory-gateway';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let service: SignupService;
  let gateway: SignUpMemoryGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupService,
        SignUpMemoryGateway,
        HashMockedGateway,
        {
          provide: 'SignupPersistenceGateway',
          useExisting: SignUpMemoryGateway,
        },
        {
          provide: 'SignupHashGateway',
          useExisting: HashMockedGateway,
        },
      ],
    }).compile();

    service = module.get<SignupService>(SignupService);
    gateway = module.get<SignUpMemoryGateway>(SignUpMemoryGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should test signUp method', () => {
    it('should be defined', () => {
      expect(service.signUp).toBeDefined();
    });

    it('should register a new SignUp', async () => {
      const input: SignUpInputInterface = {
        email: 'test@email.com',
        name: 'Test User',
        password: '123456',
      };

      await service.signUp(input);

      const response = gateway.findSignUpByEmail(input.email);
      const expectedResponse = {
        email: input.email,
        name: input.name,
        password:
          '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
      };

      expect(response).toEqual(expectedResponse);
    });

    it('should fail because email is invalid', async () => {
      const input: SignUpInputInterface = {
        email: 'test@fail',
        name: 'Test User',
        password: '123456',
      };

      await service.signUp(input).catch((error) => {
        expect(error).toStrictEqual(
          new Error('O endereço de e-mail não é válido'),
        );
      });
    });

    it('should fail because name is invalid', async () => {
      const input: SignUpInputInterface = {
        email: 'test@email.com',
        name: 'T',
        password: '123456',
      };

      await service.signUp(input).catch((error) => {
        expect(error).toStrictEqual(
          new Error('O nome deve ter entre 3 e 100 caracteres'),
        );
      });
    });

    it('should fail because password is invalid', async () => {
      const input: SignUpInputInterface = {
        email: 'test@email.com',
        name: 'Teste User',
        password: '123',
      };

      await service.signUp(input).catch((error) => {
        expect(error).toStrictEqual(
          new Error('A senha deve possuir no mínimo 6 caracteres'),
        );
      });
    });

    it('should fail because email is in use', async () => {
      const input: SignUpInputInterface = {
        email: 'mock01@email.com',
        name: 'MockUser01',
        password: '123456',
      };

      await service.signUp(input).catch((error) => {
        expect(error).toStrictEqual(
          new BadRequestException(
            `Já existe um usuário cadastrado com o e-mail informado`,
          ),
        );
      });
    });
  });
});
