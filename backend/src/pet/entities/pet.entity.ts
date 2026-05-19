import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PetDocument = HydratedDocument<Pet>;

@Schema()
export class Pet {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  age!: number;

  @Prop({ required: true })
  breed!: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Owner' })
  ownerId!: Types.ObjectId;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
