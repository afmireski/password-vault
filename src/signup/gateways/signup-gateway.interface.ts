import { SignupDTO } from '../dtos/signup.dto';

export interface SignupPersistanceGatewayInterface {
  register(input: SignupDTO): Promise<void>;
}
