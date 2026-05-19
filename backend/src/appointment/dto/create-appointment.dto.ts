import { IsNotEmpty, IsOptional, IsString, IsDateString, IsMongoId } from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  @IsNotEmpty()
  ownerId!: string;

  @IsMongoId()
  @IsNotEmpty()
  petId!: string;

  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @IsDateString()
  @IsOptional()
  finished_at?: string;

  @IsString()
  @IsOptional()
  annotation?: string;

  constructor(data?: Partial<CreateAppointmentDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
