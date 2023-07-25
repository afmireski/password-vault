import { SignUp } from '../entities/signup';
import { HashGateway } from '../gateways/hash-gateway.interface';

jest.mock('bcrypt', () => {
  genSaltSync: jest.fn().mockReturnValue('$2b$10$bwFu6.eNwW2U/gJUFbjOje');
  hashSync: jest
    .fn()
    .mockReturnValue(
      '$2b$10$GC67I1e314VQbRe50yeEN.nZLjVuTfrP/mrhzVcjaD64WsXY8FhSm',
    );
});

describe('Deve testar a regra de SignUp', () => {
  it('Deve criar um objeto SignUp válido', () => {
    const input = {
      email: 'test@email.com',
      name: 'Test User',
      password: '123456',
    };

    const hashGateway: HashGateway = {
      hash() {
        return {
          hashedPassword:
            '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
          salt: '$2b$10$bwFu6.eNwW2U/gJUFbjOje',
        };
      },
    };

    const signUp = new SignUp(
      hashGateway,
      input.email,
      input.name,
      input.password,
    );

    console.log(signUp);

    expect(signUp.email).toBe('test@email.com');
    expect(signUp.name).toBe('Test User');
    expect(signUp.password.getValue).toBe(
      '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
    );
  });
});
