import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, AppointmentDocument } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const createdAppointment = new this.appointmentModel(createAppointmentDto);
    return await createdAppointment.save();
  }

  async findAll() {
    return await this.appointmentModel.find().exec();
  }

  async findOne(id: string) {
    return await this.appointmentModel.findById(id).exec();
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.appointmentModel.findByIdAndDelete(id).exec();
  }
}
