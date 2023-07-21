import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserCount } from '../../prisma/@generated/user/user-count.output';

export interface UserDTO {
  id: string;

  email: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date | null;
}
