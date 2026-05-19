import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentItemService } from './appointment-item.service';

describe('AppointmentItemService', () => {
  let service: AppointmentItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentItemService],
    }).compile();

    service = module.get<AppointmentItemService>(AppointmentItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
