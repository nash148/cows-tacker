import { IsNotEmpty, IsString } from 'class-validator';

export class TheftAlertDto {
  @IsNotEmpty()
  @IsString()
  cowId: string;
};