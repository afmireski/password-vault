import { Test, TestingModule } from '@nestjs/testing';
import { ChangeAccountPasswordResolver } from './change-account-password.resolver';
import { ChangeAccountPasswordService } from './change-account-password.service';

describe('ChangeAccountPasswordResolver', () => {
  let resolver: ChangeAccountPasswordResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChangeAccountPasswordResolver, ChangeAccountPasswordService],
    }).compile();

    resolver = module.get<ChangeAccountPasswordResolver>(
      ChangeAccountPasswordResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
