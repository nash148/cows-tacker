import { ICow } from '../common/interfaces/ICow.interface';

export interface ICowsDBHandler {
  addNewCow: (cow: ICow) => Promise<void>;
  delCow: (id: string) => Promise<void>;
  getAllCows: () => Promise<ICow[]>;
}