import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { Pet, PetSchema } from './entities/pet.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
