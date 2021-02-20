import { Test, TestingModule } from '@nestjs/testing';
import { PhoneMsgService } from './phone-msg.service';

describe('PhoneMsgService', () => {
  let service: PhoneMsgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneMsgService],
    }).compile();

    service = module.get<PhoneMsgService>(PhoneMsgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
