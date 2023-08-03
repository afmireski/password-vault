import { Module } from '@nestjs/common';
import { ChangeAccountPasswordService } from './change-account-password.service';
import { ChangeAccountPasswordResolver } from './change-account-password.resolver';
import { ChangeAccountPasswordPrismaAdapter } from './adapters/change-account-password-prisma.adapter';
import { HashBcryptAdapter } from '../adapters/hash-bcrypt.adapter';

@Module({
  providers: [
    ChangeAccountPasswordResolver,
    ChangeAccountPasswordService,
    ChangeAccountPasswordPrismaAdapter,
    HashBcryptAdapter,
    {
      provide: 'ChangeAccountPasswordPersistanceGateway',
      useExisting: ChangeAccountPasswordPrismaAdapter,
    },
    {
      provide: 'HashGateway',
      useExisting: HashBcryptAdapter,
    },
  ],
})
export class ChangeAccountPasswordModule {}
