import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentItemController } from './appointment-item.controller';
import { AppointmentItemService } from './appointment-item.service';

describe('AppointmentItemController', () => {
  let controller: AppointmentItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentItemController],
      providers: [AppointmentItemService],
    }).compile();

    controller = module.get<AppointmentItemController>(AppointmentItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
