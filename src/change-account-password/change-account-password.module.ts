import { Module } from '@nestjs/common';
import { ChangeAccountPasswordService } from './change-account-password.service';
import { ChangeAccountPasswordResolver } from './change-account-password.resolver';
import { ChangeAccountPasswordPrismaAdapter } from './adapters/change-account-password-prisma.adapter';
import { HashBcryptGateway } from 'src/gateways/hash-bcrypt-gateway';

@Module({
  providers: [
    ChangeAccountPasswordResolver,
    ChangeAccountPasswordService,
    ChangeAccountPasswordPrismaAdapter,
    HashBcryptGateway,
    {
      provide: 'ChangeAccountPasswordPersistanceGateway',
      useExisting: ChangeAccountPasswordPrismaAdapter,
    },
    {
      provide: 'HashGateway',
      useExisting: HashBcryptGateway,
    },
  ],
})
export class ChangeAccountPasswordModule {}
