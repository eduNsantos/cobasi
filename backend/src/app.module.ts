import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerModule } from './owner/owner.module';
import { PetModule } from './pet/pet.module';
import { ServiceModule } from './service/service.module';
import { ProductModule } from './product/product.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AppointmentItemModule } from './appointment_items/appointment-item.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/cobasi?authSource=admin'
    ),
    OwnerModule,
    PetModule,
    ServiceModule,
    ProductModule,
    AppointmentModule,
    AppointmentItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
