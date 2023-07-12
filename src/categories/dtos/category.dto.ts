import { Field, ID } from '@nestjs/graphql';
import * as Transformer from 'class-transformer';
import { CategoryCount } from '../../prisma/@generated/category/category-count.output';
import { UserDTO } from '../../users/dtos/user.dto';

export class CategoryDTO {
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

  @Field(() => UserDTO, { nullable: false })
  @Transformer.Type(() => UserDTO)
  user?: UserDTO;

  @Field(() => CategoryCount, { nullable: false })
  _count?: CategoryCount;
}
