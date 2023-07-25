import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupResolver } from './signup.resolver';
import { SignupPrismaGateway } from './gateways/signup-prisma-gateway';
import { HashBcryptGateway } from './gateways/hash-bcrypt-gateway';

@Module({
  providers: [
    SignupResolver,
    SignupService,
    SignupPrismaGateway,
    HashBcryptGateway,
    {
      provide: 'SignupPersistenceGateway',
      useExisting: SignupPrismaGateway,
    },
    {
      provide: 'SignupHashGateway',
      useExisting: HashBcryptGateway,
    },
  ],
})
export class SignupModule {}
