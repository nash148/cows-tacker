export interface GpsEvent {
  cowId: string;
  timestamp: number;
  latLong: number[];
  tw: string;
  battery: string;
  counter: number;
}