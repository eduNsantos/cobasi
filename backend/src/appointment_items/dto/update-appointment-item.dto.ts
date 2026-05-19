import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentItemDto } from './create-appointment-item.dto';

export class UpdateAppointmentItemDto extends PartialType(CreateAppointmentItemDto) {}
