import { IGpsEvent } from './IGpsEvent.interface';

export interface ICow {
  id: string;
  gpsEvents?: IGpsEvent[];
}