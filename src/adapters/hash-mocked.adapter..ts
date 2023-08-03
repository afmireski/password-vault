import { Injectable } from '@nestjs/common';
import { HashGateway } from '../gateways/hash.gateway';

@Injectable()
export class HashMockedAdapter implements HashGateway {
  hash(
    password: string,
    salt: number,
  ): { hashedPassword: string; salt: string } {
    return {
      hashedPassword:
        '$2b$10$gfRCB3jpofHjnOOnH/eUw.NsqCY8pzRxtfGh7bbkmv/xNd9SoSlGO',
      salt: '$2b$10$bwFu6.eNwW2U/gJUFbjOje',
    };
  }
}
