import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateAppointmentItemDto {
  @IsMongoId()
  @IsNotEmpty()
  appointment_id!: string;

  @IsMongoId()
  @IsOptional()
  product_id?: string;

  @IsMongoId()
  @IsOptional()
  service_id?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;

  constructor(data?: Partial<CreateAppointmentItemDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
