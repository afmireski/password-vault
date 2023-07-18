import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class CreatePasswordInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id: string;

  @Field(() => String, { nullable: false })
  @Validator.MinLength(6)
  @Validator.IsNotEmpty()
  value: string;

  @Field(() => String, { nullable: true })
  @Validator.IsOptional()
  username?: string;

  @Field(() => String, { nullable: true })
  @Validator.IsUUID('4')
  @Validator.IsOptional()
  category_id?: string;

  @Field(() => String, { nullable: true })
  @Validator.MaxLength(50)
  @Validator.IsOptional()
  description?: string;
}
