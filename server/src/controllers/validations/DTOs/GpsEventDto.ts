import { IsNotEmpty, IsString, IsDateString, IsLatLong } from 'class-validator';

export class GpsEventDto {
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
};