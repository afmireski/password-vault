import { ArgsType, Field } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { FindUserByIdInterface } from './find-user-by-id.interface';

@ArgsType()
export class FindUserInput implements FindUserByIdInterface {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id: string;
}
