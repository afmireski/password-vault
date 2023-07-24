import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as Transformer from 'class-transformer';
import { UserGraphQLDTO } from 'src/users/dtos/user-graphql.dto';
import { CategoryCount } from '../../prisma/@generated/category/category-count.output';
import { CategoryDTO } from './category.dto';

@ObjectType()
export class CategoryGraphQLDTO implements CategoryDTO {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  user_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  @Field(() => Date, { nullable: false })
  updated_at!: Date;

  @Field(() => Date, { nullable: true })
  deleted_at!: Date | null;

  @Field(() => UserGraphQLDTO, { nullable: false })
  @Transformer.Type(() => UserGraphQLDTO)
  owner?: UserGraphQLDTO;

  @Field(() => CategoryCount, { nullable: false })
  _count?: CategoryCount;
}