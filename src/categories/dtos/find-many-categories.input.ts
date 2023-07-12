import { Field, InputType } from '@nestjs/graphql';
import { FindManyInput } from 'src/dtos/find-many.input';
import { CategoryOrderByWithRelationInput } from 'src/prisma/@generated/category/category-order-by-with-relation.input';
import { CategoryWhereInput } from 'src/prisma/@generated/category/category-where.input';
import * as Validator from 'class-validator';

@InputType()
export class FindManyCategoriesInput extends FindManyInput(
  CategoryWhereInput,
  CategoryOrderByWithRelationInput,
) {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id!: string;
}
