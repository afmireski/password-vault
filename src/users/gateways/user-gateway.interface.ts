import { Request, Response } from "src/types/custom-types";
import { FindUserByIdInterface } from "../dtos/find-user-by-id.interface";
import { UserDTO } from "../dtos/user.dto";

export interface UserGatewayInterface {
    findUserById(request: Request<FindUserByIdInterface>): Response<UserDTO>;
}