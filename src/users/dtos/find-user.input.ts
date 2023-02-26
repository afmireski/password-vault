import { ArgsType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@ArgsType()
export class FindUserInput {
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id: string;
}
