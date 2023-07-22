import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserCount } from '../../prisma/@generated/user/user-count.output';
import { UserDTO } from './user.dto';

@ObjectType()
export class UserGraphQLDTO implements UserDTO {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Date, { nullable: false })
  created_at: Date;

  @Field(() => Date, { nullable: false })
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
