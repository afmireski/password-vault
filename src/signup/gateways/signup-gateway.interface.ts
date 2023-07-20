import { SignupInputInterface } from "../dtos/signup-input.interface";

export interface SignupGatewayInterface {
    register(input: SignupInputInterface): Promise<void>
}