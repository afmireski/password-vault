import { ArgsType, Field } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@ArgsType()
export class FindCategoryInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  category_id!: string;
}
