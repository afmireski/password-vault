import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Success {
  @Field(() => Boolean, { nullable: false, defaultValue: true })
  success!: boolean;
}
