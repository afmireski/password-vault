import { Injectable } from '@nestjs/common';
import { HashGateway } from './hash-gateway.interface';

@Injectable()
export class HashMockedGateway implements HashGateway {
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
