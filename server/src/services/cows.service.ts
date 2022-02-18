import { Injectable } from '@nestjs/common';

import { ICow } from '../common/interfaces/ICow.interface';
import { IDBAccess } from '../dal/IDBAccess.interface';

@Injectable()
export class CowsService {
  constructor(private db: IDBAccess){};

  async addNewCow(cow: ICow): Promise<void> {
    await this.db.addNewCow(cow);
  };

  async delCow(id: string): Promise<void> {
    await this.db.delCow(id);
  };

  async getAllCows(): Promise<ICow[]> {
    return await this.db.getAllCows()
  };
};