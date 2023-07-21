import { ArgsType, Field } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { FindUserByIdInput } from './find-user-by-id.interface';

@ArgsType()
export class FindUserGraphQLInput implements FindUserByIdInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id: string;
}
