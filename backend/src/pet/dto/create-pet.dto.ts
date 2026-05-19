import { Type } from 'class-transformer';
import { IsInt, IsMongoId, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsMongoId()
  ownerId: string;

  constructor(name: string, age: number, breed: string, ownerId: string) {
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.ownerId = ownerId;
  }
}
