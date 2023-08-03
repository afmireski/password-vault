import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupResolver } from './signup.resolver';
import { SignupPrismaAdapter } from './adapters/signup-prisma.adapter';
import { HashBcryptAdapter } from '../adapters/hash-bcrypt.adapter';

@Module({
  providers: [
    SignupResolver,
    SignupService,
    SignupPrismaAdapter,
    HashBcryptAdapter,
    {
      provide: 'SignupPersistenceGateway',
      useExisting: SignupPrismaAdapter,
    },
    {
      provide: 'SignupHashGateway',
      useExisting: HashBcryptAdapter,
    },
  ],
})
export class SignupModule {}
