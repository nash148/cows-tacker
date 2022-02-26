import { IsNotEmpty, IsString, IsDateString, IsLatLong, IsNumber } from 'class-validator';

export class CreateGpsEventDto {
  @IsNotEmpty()
  @IsString()
  cowId: string;

  @IsNotEmpty()
  @IsDateString()
  timestamp: string;

  @IsLatLong()
  latLong?: string;

  @IsNotEmpty()
  @IsString()
  wt: string;

  @IsNotEmpty()
  @IsString()
  battery: string;

  @IsNotEmpty()
  @IsNumber()
  counter: number;
};