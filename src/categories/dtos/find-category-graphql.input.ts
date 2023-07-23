import { ArgsType, Field } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { FindCategoryByIdInput } from './find-category-by-id.input';

@ArgsType()
export class FindCategoryGraphQLInput implements FindCategoryByIdInput {
  @Field(() => String, { nullable: false })
  @Validator.IsUUID('4')
  @Validator.IsNotEmpty()
  category_id!: string;
}
