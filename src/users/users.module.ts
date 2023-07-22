import { Module } from '@nestjs/common';
import { UserPrismaGateway } from './gateways/user-prisma-gateway';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    UserPrismaGateway,
    {
      provide: 'UserPersistenceGateway',
      useExisting: UserPrismaGateway,
    },
  ],
})
export class UsersModule {}
