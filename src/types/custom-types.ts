export type Request<T> = {
  input: T;
  select: any;
};

export type Response<T> = Promise<Partial<T>>;

export type ResponseArray<T> = Promise<Partial<T>[]>;
