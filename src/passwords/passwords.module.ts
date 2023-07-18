import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsResolver } from './passwords.resolver';

@Module({
  providers: [PasswordsResolver, PasswordsService]
})
export class PasswordsModule {}
