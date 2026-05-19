import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentItemService } from './appointment-item.service';
import { AppointmentItemController } from './appointment-item.controller';
import { AppointmentItem, AppointmentItemSchema } from './entities/appointment-item.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: AppointmentItem.name, schema: AppointmentItemSchema }])],
  controllers: [AppointmentItemController],
  providers: [AppointmentItemService],
})
export class AppointmentItemModule {}
