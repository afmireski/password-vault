import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { CreateCategoryInput } from './create-category.input';

@InputType()
export class CreateCategoryGraphQLInput implements CreateCategoryInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id!: string;

  @Field(() => String, { nullable: false })
  @Validator.Length(1, 50)
  name!: string;
}
