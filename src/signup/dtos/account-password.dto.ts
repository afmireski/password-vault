import { HashGateway } from '../gateways/hash-gateway.interface';

export class AccountPasswordDTO {
  constructor(hashGateway: HashGateway, value: string, salt: number) {
    const { hashPassword, salt: generatedSalt } = hashGateway.hash(value, salt);

    this.salt = generatedSalt;
    this.value = hashPassword;
  }

  private salt: string;
  private value: string;

  public get getValue(): string {
    return this.value;
  }
}
