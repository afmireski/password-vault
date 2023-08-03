import * as bcrypt from 'bcrypt';
import { HashGateway } from 'src/gateways/hash.gateway';

export class HashBcryptAdapter implements HashGateway {
  hash(
    password: string,
    salt: number,
  ): { hashedPassword: string; salt: string } {
    const generatedSalt = bcrypt.genSaltSync(salt);
    const hash = bcrypt.hashSync(password, salt);

    return { salt: generatedSalt, hashedPassword: hash };
  }
}
