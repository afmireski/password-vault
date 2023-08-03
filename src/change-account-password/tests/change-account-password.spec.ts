import { HashGateway } from '../../gateways/hash.gateway';
import { ChangeAccountPassword } from '../entities/change-account-password';

describe('Deve testar a regra de Alterar Senha da Conta', () => {
  it('Deve criar um objeto ChangeAccountPassword válido', () => {
    const hashGateway: HashGateway = {
      hash() {
        return {
          salt: '$2b$10$bwFu6.eNwW2U/gJUFbjOje',
          hashedPassword:
            '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
        };
      },
    };

    const changeAccountPassword = ChangeAccountPassword.create(
      hashGateway,
      'c7864812-8c88-4683-ab71-2a0ac5c2ca52',
      '123456',
      '654321',
    );

    expect(changeAccountPassword.userId).toBe(
      'c7864812-8c88-4683-ab71-2a0ac5c2ca52',
    );
    expect(changeAccountPassword.currentPassword).toBe('123456');
    expect(changeAccountPassword.newPassword.getValue).toBe(
      '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
    );
  });

  it('Deve falhar pois o id do usuário é inválido', () => {
    const hashGateway: HashGateway = {
      hash() {
        return {
          salt: '$2b$10$bwFu6.eNwW2U/gJUFbjOje',
          hashedPassword:
            '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
        };
      },
    };

    try {
      ChangeAccountPassword.create(hashGateway, '', '123456', '654321');
    } catch (error) {
      expect(error).toStrictEqual(new Error('O id do usuário não é válido'));
    }
  });

  it('Deve falhar pois a senha atual é inválida', () => {
    const hashGateway: HashGateway = {
      hash() {
        return {
          salt: '$2b$10$bwFu6.eNwW2U/gJUFbjOje',
          hashedPassword:
            '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
        };
      },
    };

    try {
      ChangeAccountPassword.create(
        hashGateway,
        'c7864812-8c88-4683-ab71-2a0ac5c2ca52',
        '',
        '654321',
      );
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('A senha atual não está num formato válido'),
      );
    }
  });

  it('Deve falhar pois a nova senha é inválida', () => {
    const hashGateway: HashGateway = {
      hash() {
        return {
          salt: '$2b$10$bwFu6.eNwW2U/gJUFbjOje',
          hashedPassword:
            '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
        };
      },
    };

    try {
      ChangeAccountPassword.create(
        hashGateway,
        'c7864812-8c88-4683-ab71-2a0ac5c2ca52',
        '123456',
        '',
      );
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('A senha deve ter no mínimo 6 caracteres'),
      );
    }
  });
});
