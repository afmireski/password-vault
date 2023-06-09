export type PrismaRequest<T> = {
  input: T;
  select: any;
};

export type PrismaResponse<T> = Promise<Partial<T>>;

export type PrismaResponseArray<T> = Promise<Partial<T>[]>;
