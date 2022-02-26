export interface GpsEvent {
  cowId: string;
  timestamp: string;
  latLong?: string;
  wt: string;
  battery: string;
  counter: number;
}