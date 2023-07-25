import { SignUp } from '../entities/signup';

export interface SignupPersistanceGatewayInterface {
  register(input: SignUp): Promise<void>;
}
