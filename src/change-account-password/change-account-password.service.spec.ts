import { Test, TestingModule } from '@nestjs/testing';
import { HashMockedAdapter } from '../adapters/hash-mocked.adapter.';
import { ChangeAccountPasswordMemoryAdapter } from './adapters/change-account-password-memory.adapter';
import { ChangeAccountPasswordService } from './change-account-password.service';
import { ChangeAccountPasswordInput } from './dtos/change-account-password.input';

describe('ChangeAccountPasswordService', () => {
  let service: ChangeAccountPasswordService;
  let gateway: ChangeAccountPasswordMemoryAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeAccountPasswordService,
        ChangeAccountPasswordMemoryAdapter,
        HashMockedAdapter,
        {
          provide: 'ChangeAccountPasswordPersistanceGateway',
          useExisting: ChangeAccountPasswordMemoryAdapter,
        },
        {
          provide: 'HashGateway',
          useExisting: HashMockedAdapter,
        },
      ],
    }).compile();

    service = module.get<ChangeAccountPasswordService>(
      ChangeAccountPasswordService,
    );

    gateway = module.get<ChangeAccountPasswordMemoryAdapter>(
      ChangeAccountPasswordMemoryAdapter,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Deve testar changeAccountPassword', () => {
    it('should be defined', () => {
      expect(service.changeAccountPassword).toBeDefined();
    });

    it('Deve alterar a senha da conta', async () => {
      const input: ChangeAccountPasswordInput = {
        userId: '70cd1369-e7f1-4167-a267-5639912ecc2d',
        currentPassword: '123456',
        newPassword: '654321',
      };

      await service.changeAccountPassword({ input });

      const response = gateway.findAccount(input.userId);

      expect(response.password).toBe(
        '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
      );
    });

    it('Deve falhar pois o id do usuário é inválido', async () => {
      const input: ChangeAccountPasswordInput = {
        userId: '',
        currentPassword: '123456',
        newPassword: '654321',
      };

      await service.changeAccountPassword({ input }).catch((error) => {
        expect(error).toStrictEqual(new Error('O id do usuário não é válido'));
      });
    });

    it('Deve falhar pois a senha atual é inválida', async () => {
      const input: ChangeAccountPasswordInput = {
        userId: '70cd1369-e7f1-4167-a267-5639912ecc2d',
        currentPassword: '',
        newPassword: '654321',
      };

      await service.changeAccountPassword({ input }).catch((error) => {
        expect(error).toStrictEqual(
          new Error('A senha atual não está num formato válido'),
        );
      });
    });

    it('Deve falhar pois a nova senha é inválida', async () => {
      const input: ChangeAccountPasswordInput = {
        userId: '70cd1369-e7f1-4167-a267-5639912ecc2d',
        currentPassword: '123456',
        newPassword: '',
      };

      await service.changeAccountPassword({ input }).catch((error) => {
        expect(error).toStrictEqual(
          new Error('A senha deve ter no mínimo 6 caracteres'),
        );
      });
    });
  });
});
