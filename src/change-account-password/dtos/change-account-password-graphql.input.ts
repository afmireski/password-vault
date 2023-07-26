import { Field } from '@nestjs/graphql';
import { ChangeAccountPasswordInput } from './change-account-password.input';

export class ChangeAccountPasswordGraphQLInput
  implements ChangeAccountPasswordInput
{
  @Field(() => String, { nullable: false })
  userId: string;

  @Field(() => String, { nullable: false })
  currentPassword: string;

  @Field(() => String, { nullable: false })
  newPassword: string;
}
