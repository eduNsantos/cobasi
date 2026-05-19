import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

@Injectable()
export class CreateAppointmentValidationPipe implements PipeTransform {
  transform(value: CreateAppointmentDto): CreateAppointmentDto {
    if (!value.ownerId || typeof value.ownerId !== 'string') {
      throw new BadRequestException('ownerId is required and must be a valid MongoDB ID');
    }

    if (!value.petId || typeof value.petId !== 'string') {
      throw new BadRequestException('petId is required and must be a valid MongoDB ID');
    }

    if (!value.date) {
      throw new BadRequestException('date is required');
    }

    return value;
  }
}
