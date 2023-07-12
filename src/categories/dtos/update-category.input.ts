import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  category_id!: string;

  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id!: string;

  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.Length(1, 50)
  name!: string;
}
