import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppointmentItemService } from './appointment-item.service';
import { CreateAppointmentItemDto } from './dto/create-appointment-item.dto';
import { UpdateAppointmentItemDto } from './dto/update-appointment-item.dto';
import { CreateAppointmentItemValidationPipe } from './pipes/create-appointment-item-validation.pipe';

@Controller('appointment-item')
export class AppointmentItemController {
  constructor(private readonly appointmentItemService: AppointmentItemService) {}

  @Post()
  @UsePipes(CreateAppointmentItemValidationPipe, new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createAppointmentItemDto: CreateAppointmentItemDto) {
    return this.appointmentItemService.create(createAppointmentItemDto);
  }

  @Get()
  findAll() {
    return this.appointmentItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentItemService.findOne(id);
  }

  @Get('appointment/:appointmentId')
  findByAppointmentId(@Param('appointmentId') appointmentId: string) {
    return this.appointmentItemService.findByAppointmentId(appointmentId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateAppointmentItemDto: UpdateAppointmentItemDto) {
    return this.appointmentItemService.update(id, updateAppointmentItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentItemService.remove(id);
  }
}
