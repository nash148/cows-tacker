import { IsNotEmpty } from 'class-validator';

export class CowDto {
  @IsNotEmpty()
  id: string;
};