import { HashGateway } from '../../gateways/hash-gateway.interface';

export class AccountPassword {
  private constructor(value: string, salt: string) {
    this.salt = salt;
    this.value = value;
  }

  private salt: string;
  private value: string;

  static create(
    hashGateway: HashGateway,
    value: string,
    salt: number,
  ): AccountPassword {
    if (value.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres');
    }

    const { hashedPassword, salt: generatedSalt } = hashGateway.hash(
      value,
      salt,
    );

    return new AccountPassword(hashedPassword, generatedSalt);
  }

  public get getValue(): string {
    return this.value;
  }
}
