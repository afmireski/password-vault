import { Type } from '@nestjs/common';
import { ArgsType, Field } from '@nestjs/graphql';
import { Pagination, PaginationInterface } from './pagination.input';
import * as Validator from 'class-validator';
import * as Transformer from 'class-transformer';

export interface FindManyInterface<T, U> {
  where?: T;
  orderBy?: U;
  pagination?: PaginationInterface;
}

export function FindManyGraphQLInput<T, U>(
  t: Type<T>,
  u: Type<U>,
): Type<FindManyInterface<T, U>> {
  @ArgsType()
  abstract class FindManyType implements FindManyInterface<T, U> {
    @Field(() => t, { nullable: true })
    @Transformer.Type(() => t)
    @Validator.IsOptional()
    @Validator.ValidateNested()
    where?: T;

    @Field(() => u, { nullable: true })
    @Transformer.Type(() => u)
    @Validator.IsOptional()
    @Validator.ValidateNested()
    orderBy?: U;

    @Field(() => Pagination, { nullable: true, defaultValue: {} })
    @Transformer.Type(() => Pagination)
    @Validator.IsOptional()
    @Validator.ValidateNested()
    pagination?: Pagination;
  }

  return FindManyType as Type<FindManyInterface<T, U>>;
}
