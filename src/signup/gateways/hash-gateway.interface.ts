export interface HashGateway {
  hash(password: string, salt: number): Output;
}

type Output = {
  hashPassword: string;
  salt: string;
};
