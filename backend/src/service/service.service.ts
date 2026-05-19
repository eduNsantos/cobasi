import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDocument } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>) {}

  async create(createServiceDto: CreateServiceDto) {
    const createdService = new this.serviceModel(createServiceDto);
    return await createdService.save();
  }

  async findAll() {
    return await this.serviceModel.find().exec();
  }

  async findOne(id: string) {
    return await this.serviceModel.findById(id).exec();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.serviceModel.findByIdAndDelete(id).exec();
  }
}
