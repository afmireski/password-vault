import { ArgsType, Field } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { FindManyInput } from 'src/dtos/find-many.input';
import { CategoryOrderByWithRelationInput } from 'src/prisma/@generated/category/category-order-by-with-relation.input';
import { CategoryWhereInput } from 'src/prisma/@generated/category/category-where.input';

@ArgsType()
export class FindManyCategoriesInput extends FindManyInput(
  CategoryWhereInput,
  CategoryOrderByWithRelationInput,
) {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id!: string;
}
