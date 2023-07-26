import { Field, InputType } from '@nestjs/graphql';
import { SignUpInputInterface } from './signup-input.interface';

@InputType()
export class SignUpGraphQLInput implements SignUpInputInterface {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  password: string;
}
