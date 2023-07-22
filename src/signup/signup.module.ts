import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupResolver } from './signup.resolver';
import { SignupPrismaGateway } from './gateways/signup-prisma-gateway';

@Module({
  providers: [
    SignupResolver,
    SignupService,
    SignupPrismaGateway,
    {
      provide: 'SignupPersistenceGateway',
      useExisting: SignupPrismaGateway,
    },
  ],
})
export class SignupModule {}
