import { Field, InputType, Int } from "@nestjs/graphql";
import * as Validator from 'class-validator';

export interface PaginationInterface {
    skip?: number;

    take?: number;
}

@InputType()
export class Pagination implements PaginationInterface{
    @Field(() => Int, { nullable: false })
    @Validator.Min(0)
    @Validator.IsOptional()
    skip?: number;

    @Field(() => Int, { nullable: false })
    @Validator.IsPositive()
    @Validator.IsOptional()
    take?: number;
}