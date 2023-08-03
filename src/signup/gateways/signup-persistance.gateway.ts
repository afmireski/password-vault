import { SignUp } from '../entities/signup';

export interface SignUpPersistanceGateway {
  register(input: SignUp): Promise<void>;
}
