export interface HashGateway {
  hash(password: string, salt: number): Output;
}

type Output = {
  hashedPassword: string;
  salt: string;
};
