import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id: string;

  @Field(() => String, { nullable: true })
  @Validator.IsEmail()
  @Validator.IsOptional()
  email: string;

  @Field(() => String, { nullable: true })
  @Validator.IsString()
  @Validator.Length(3, 100, {
    message: 'O nome pode ter entre 3 e 100 caracteres',
  })
  @Validator.IsOptional()
  name: string;
}
