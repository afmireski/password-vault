import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class FindCategoryInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  category_id!: string;
}
