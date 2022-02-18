import { IsNumberString, IsNotEmpty } from 'class-validator';

export class IdParam {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
