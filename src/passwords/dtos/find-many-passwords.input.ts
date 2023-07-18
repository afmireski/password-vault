import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { FindManyInput } from '../../dtos/find-many.input';
import { PasswordOrderByWithRelationInput } from '../../prisma/@generated/password/password-order-by-with-relation.input';
import { PasswordWhereInput } from '../../prisma/@generated/password/password-where.input';

@InputType()
export class FindManyPasswords extends FindManyInput(
  PasswordWhereInput,
  PasswordOrderByWithRelationInput,
) {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id!: string;
}
