import { SignupInputInterface } from "../dtos/signup-input.interface";
import { SignupDTO } from "../dtos/signup.dto";

export interface SignupGatewayInterface {
    register(input: SignupDTO): Promise<void>
}