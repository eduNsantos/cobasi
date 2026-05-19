import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateAppointmentItemDto } from '../dto/create-appointment-item.dto';

@Injectable()
export class CreateAppointmentItemValidationPipe implements PipeTransform {
  transform(value: CreateAppointmentItemDto): CreateAppointmentItemDto {
    if (!value.appointment_id || typeof value.appointment_id !== 'string') {
      throw new BadRequestException('appointment_id is required and must be a valid MongoDB ID');
    }

    if (!value.product_id && !value.service_id) {
      throw new BadRequestException('At least product_id or service_id is required');
    }

    return value;
  }
}
