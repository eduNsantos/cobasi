import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({ required: true, type: Types.ObjectId })
  ownerId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  petId!: Types.ObjectId;

  @Prop({ required: true })
  date!: Date;

  @Prop()
  finished_at?: Date;

  @Prop()
  annotation?: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
