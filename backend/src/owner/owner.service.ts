import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner, OwnerDocument } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const existing = await this.ownerModel.findOne({ email: createOwnerDto.email }).exec();
    if (existing) {
      throw new ConflictException('Owner with this email already exists');
    }

    const createdOwner = new this.ownerModel(createOwnerDto);
    return await createdOwner.save();
  }

  async findAll() {
    return await this.ownerModel.find().exec();
  }

  async findOne(id: string) {
    return await this.ownerModel.findById(id).exec();
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    if (updateOwnerDto.email) {
      const existing = await this.ownerModel
        .findOne({ email: updateOwnerDto.email, _id: { $ne: id } })
        .exec();
      if (existing) {
        throw new ConflictException('Owner with this email already exists');
      }
    }

    return await this.ownerModel.findByIdAndUpdate(id, updateOwnerDto, { new: true }).exec();
  }

  async remove(id: string) {
    return await this.ownerModel.findByIdAndDelete(id).exec();
  }
}
