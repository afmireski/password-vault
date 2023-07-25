import { HashGateway } from './hash-gateway.interface';
import * as bcrypt from 'bcrypt';

export class HashBcryptGateway implements HashGateway {
  hash(password: string, salt: number): { hashPassword: string; salt: string } {
    const generatedSalt = bcrypt.genSaltSync(salt);
    const hash = bcrypt.hashSync(password, salt);

    return { salt: generatedSalt, hashPassword: hash };
  }
}
