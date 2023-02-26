import { ArgsType, Field } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@ArgsType()
export class FindUserInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id: string;
}
