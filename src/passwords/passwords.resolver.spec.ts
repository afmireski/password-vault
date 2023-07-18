import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsResolver } from './passwords.resolver';
import { PasswordsService } from './passwords.service';

describe('PasswordsResolver', () => {
  let resolver: PasswordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordsResolver, PasswordsService],
    }).compile();

    resolver = module.get<PasswordsResolver>(PasswordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
