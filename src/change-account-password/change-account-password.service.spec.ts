import { Test, TestingModule } from '@nestjs/testing';
import { ChangeAccountPasswordService } from './change-account-password.service';

describe('ChangeAccountPasswordService', () => {
  let service: ChangeAccountPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChangeAccountPasswordService],
    }).compile();

    service = module.get<ChangeAccountPasswordService>(
      ChangeAccountPasswordService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
