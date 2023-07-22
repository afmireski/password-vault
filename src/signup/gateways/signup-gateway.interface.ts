import { SignupInputInterface } from '../dtos/signup-input.interface';
import { SignupDTO } from '../dtos/signup.dto';

export interface SignupPersistanceGatewayInterface {
  register(input: SignupDTO): Promise<void>;
}
