import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Owner, OwnerSchema } from './entities/owner.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }])],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
