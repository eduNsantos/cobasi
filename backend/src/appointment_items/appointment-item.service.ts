import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentItemDto } from './dto/create-appointment-item.dto';
import { UpdateAppointmentItemDto } from './dto/update-appointment-item.dto';
import { AppointmentItem, AppointmentItemDocument } from './entities/appointment-item.entity';

@Injectable()
export class AppointmentItemService {
  constructor(@InjectModel(AppointmentItem.name) private appointmentItemModel: Model<AppointmentItemDocument>) {}

  async create(createAppointmentItemDto: CreateAppointmentItemDto) {
    const createdAppointmentItem = new this.appointmentItemModel(createAppointmentItemDto);
    return await createdAppointmentItem.save();
  }

  async findAll() {
    return await this.appointmentItemModel.find().exec();
  }

  async findOne(id: string) {
    return await this.appointmentItemModel.findById(id).exec();
  }

  async findByAppointmentId(appointmentId: string) {
    return await this.appointmentItemModel.find({ appointment_id: appointmentId }).exec();
  }

  async update(id: string, updateAppointmentItemDto: UpdateAppointmentItemDto) {
    return await this.appointmentItemModel
      .findByIdAndUpdate(id, updateAppointmentItemDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.appointmentItemModel.findByIdAndDelete(id).exec();
  }
}
