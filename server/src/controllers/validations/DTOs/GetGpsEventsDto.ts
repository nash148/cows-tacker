import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class GetGpsEventsQuery {
  @IsNotEmpty()
  @IsString()
  cowId: string;

  @IsArray()
  slice?: number[];
};