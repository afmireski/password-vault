import { Module } from '@nestjs/common';
import { UserPrismaAdapter } from './adapters/user-prisma.adapter';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    UserPrismaAdapter,
    {
      provide: 'UserPersistenceGateway',
      useExisting: UserPrismaAdapter,
    },
  ],
})
export class UsersModule {}
