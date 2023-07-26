import { HashGateway } from '../../gateways/hash-gateway.interface';
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
    expect(changeAccountPassword.oldPassword).toBe('123456');
    expect(changeAccountPassword.newPassword.getValue).toBe(
      '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
    );
  });
});
