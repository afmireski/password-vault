import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import * as Transformer from 'class-transformer';
import { CategoryDTO } from 'src/categories/dtos/category.dto';
import { UserDTO } from 'src/users/dtos/user.dto';

@ObjectType()
export class PasswordDTO {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  user_id!: string;

  @Field(() => String, { nullable: true })
  category_id!: string | null;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  username!: string | null;

  @Field(() => String, { nullable: false })
  value!: string;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  @Field(() => Date, { nullable: false })
  updated_at!: Date;

  @Field(() => Date, { nullable: true })
  deleted_at!: Date | null;

  @Field(() => UserDTO, { nullable: false })
  @Transformer.Type(() => UserDTO)
  user?: UserDTO;

  @Field(() => CategoryDTO, { nullable: true })
  @Transformer.Type(() => CategoryDTO)
  category?: CategoryDTO | null;
}
