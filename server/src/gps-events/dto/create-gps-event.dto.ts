import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateGpsEventDto {
  @IsNotEmpty()
  @IsString()
  cowId: string;

  @IsNotEmpty()
  @IsNumber()
  timestamp: number;

  @IsArray()
  @IsOptional()
  latLong?: number[];

  @IsNotEmpty()
  @IsString()
  tw: string;

  @IsNotEmpty()
  @IsString()
  battery: string;

  @IsNotEmpty()
  @IsNumber()
  counter: number;
};