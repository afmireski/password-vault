import { Module } from '@nestjs/common';
import { ChangeAccountPasswordService } from './change-account-password.service';
import { ChangeAccountPasswordResolver } from './change-account-password.resolver';

@Module({
  providers: [ChangeAccountPasswordResolver, ChangeAccountPasswordService],
})
export class ChangeAccountPasswordModule {}
