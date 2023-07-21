import { Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';

export interface UpdateUserInput {
  user_id: string;
  email: string;
  name: string;
}
