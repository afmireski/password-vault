import { HashGateway } from 'src/gateways/hash-gateway.interface';
import { HashMockedGateway } from 'src/gateways/hash-mocked-gateway';
import { SignUp } from '../entities/signup';

describe('Teste da regra de SignUp', () => {
  it('Deve criar um objeto SignUp válido', () => {
    const input = {
      email: 'test@email.com',
      name: 'Test User',
      password: '123456',
    };

    const hashGateway: HashGateway = new HashMockedGateway();

    const signUp = SignUp.create(
      hashGateway,
      input.email,
      input.name,
      input.password,
    );

    expect(signUp.email).toBe('test@email.com');
    expect(signUp.name).toBe('Test User');
    expect(signUp.password.getValue).toBe(
      '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
    );
  });

  it('Deve falhar pois o e-mail é inválido', () => {
    const input = {
      email: 'test@fail',
      name: 'Test User',
      password: '123456',
    };

    const hashGateway: HashGateway = new HashMockedGateway();

    try {
      SignUp.create(hashGateway, input.email, input.name, input.password);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('O endereço de e-mail não é válido'),
      );
    }
  });

  it('Deve falhar pois o nome é inválido', () => {
    const input = {
      email: 'test@email.com',
      name: '',
      password: '123456',
    };

    const hashGateway: HashGateway = new HashMockedGateway();

    try {
      SignUp.create(hashGateway, input.email, input.name, input.password);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('O nome deve ter entre 3 e 100 caracteres'),
      );
    }
  });

  it('Deve falhar pois a senha é inválida', () => {
    const input = {
      email: 'test@email.com',
      name: 'Teste User',
      password: '',
    };

    const hashGateway: HashGateway = new HashMockedGateway();

    try {
      SignUp.create(hashGateway, input.email, input.name, input.password);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('A senha deve possuir no mínimo 6 caracteres'),
      );
    }
  });
});