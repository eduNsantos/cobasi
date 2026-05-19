import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AppointmentItemDocument = HydratedDocument<AppointmentItem>;

@Schema()
export class AppointmentItem {
  @Prop({ required: true, type: Types.ObjectId })
  appointment_id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  product_id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  service_id?: Types.ObjectId;

  @Prop({ required: true })
  price!: number;
}

export const AppointmentItemSchema = SchemaFactory.createForClass(AppointmentItem);
