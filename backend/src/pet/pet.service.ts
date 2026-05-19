import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetDocument } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  async create(createPetDto: CreatePetDto) {
    const createdPet = new this.petModel({
      ...createPetDto,
      ownerId: new Types.ObjectId(createPetDto.ownerId),
    });
    return await createdPet.save();
  }

  async findAll() {
    return await this.petModel.find().exec();
  }

  async findOne(id: string) {
    return await this.petModel.findById(id).exec();
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const payload = { ...updatePetDto } as Partial<Record<string, any>>;
    if (payload.ownerId) {
      payload.ownerId = new Types.ObjectId(payload.ownerId);
    }
    return await this.petModel.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  async remove(id: string) {
    return await this.petModel.findByIdAndDelete(id).exec();
  }
}
