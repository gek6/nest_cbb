import { Test, TestingModule } from '@nestjs/testing';
import { PhoneMsgController } from './phone-msg.controller';

describe('PhoneMsgController', () => {
  let controller: PhoneMsgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneMsgController],
    }).compile();

    controller = module.get<PhoneMsgController>(PhoneMsgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
