import { Request, Response } from "src/types/custom-types";
import { FindUserByIdInput } from "../dtos/find-user-by-id.interface";
import { UpdateUserInput } from "../dtos/update-user.input";
import { UserDTO } from "../dtos/user.dto";

export interface UserPersistanceGateway {
    findUserById(request: Request<FindUserByIdInput>): Response<UserDTO>;

    update(request: Request<UpdateUserInput>): Response<UserDTO>;

    delete(request: Request<FindUserByIdInput>): Promise<void>
}