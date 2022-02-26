import { IsNotEmpty } from 'class-validator';

export class CreateCowDto {
  @IsNotEmpty()
  readonly cowId: string;
};