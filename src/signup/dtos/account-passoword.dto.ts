import * as bcrypt from 'bcrypt';

export class AccountPasswordDTO {
  constructor(value: string, salt: number) {
    this.salt = bcrypt.genSaltSync(salt);
    this.value = bcrypt.hashSync(value, salt);
  }

  private salt: string;
  private value: string;
  
  public get getValue() : string {
    return this.value;
  }
  
}
