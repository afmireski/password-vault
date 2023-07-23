import { ArgsType, Field } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { FindManyGraphQLInput } from '../../dtos/find-many.input';
import { CategoryOrderByWithRelationInput } from '../../prisma/@generated/category/category-order-by-with-relation.input';
import { CategoryWhereInput } from '../../prisma/@generated/category/category-where.input';
import { FindManyCategoriesInput } from './find-many-categories.input';

@ArgsType()
export class FindManyCategoriesGraphQLInput
  extends FindManyGraphQLInput(
    CategoryWhereInput,
    CategoryOrderByWithRelationInput,
  )
  implements FindManyCategoriesInput
{
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  user_id!: string;
}
