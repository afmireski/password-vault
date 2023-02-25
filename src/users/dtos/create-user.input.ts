import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  @Validator.IsEmail()
  @Validator.MaxLength(100, {
    message: 'O e-mail pode ter no máximo 100 caracteres',
  })
  @Validator.IsNotEmpty()
  email: string;

  @Field(() => String, { nullable: false })
  @Validator.IsString()
  @Validator.Length(3, 100, {
    message: 'O nome pode ter entre 3 e 100 caracteres',
  })
  @Validator.IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: false })
  @Validator.IsEmail()
  @Validator.Length(6, 100, {
    message: 'A senha pode ter entre 6 e 100 caracteres',
  })
  password: string;
}
