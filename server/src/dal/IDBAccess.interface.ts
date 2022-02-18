import { ICow } from '../common/interfaces/ICow.interface';
import { IGpsEvent } from '../common/interfaces/IGpsEvent.interface';

export interface IDBAccess {
  addNewCow: (cow: ICow) => Promise<void>;
  delCow: (id: string) => Promise<void>;
  // addGpsEvent: (gpsEvent: IGpsEvent) => Promise<void>;
  getAllCows: () => Promise<ICow[]>;
  // getCowGpsEventsSlice: (id: string, slice: number) => Promise<IGpsEvent[]>;
}