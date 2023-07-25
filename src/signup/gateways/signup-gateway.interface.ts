import { Signup } from '../entities/signup';

export interface SignupPersistanceGatewayInterface {
  register(input: Signup): Promise<void>;
}
