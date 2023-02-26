import { PrismaSelect } from '@paljs/plugins';

export type PrismaRequest<T> = {
  input: T;
  select: PrismaSelect;
};

export type PrismaResponse<T> = Promise<Partial<T>>;

export type PrismaResponseArray<T> = Promise<Partial<T>[]>;
