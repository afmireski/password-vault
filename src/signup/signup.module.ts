import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupResolver } from './signup.resolver';

@Module({
  providers: [SignupResolver, SignupService]
})
export class SignupModule {}
