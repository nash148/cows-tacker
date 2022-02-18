import { Injectable } from '@nestjs/common';

import { ICow } from '../common/interfaces/ICow.interface';
import { CowsDBHandler } from '../dal/mongodb/CowsDBHandler.class'
import { ICowsDBHandler } from '../dal/ICowsDBHandler.interface';

@Injectable()
export class CowsService {
  static instance: CowsService;
  private db: ICowsDBHandler;

  constructor(){
    this.db = new CowsDBHandler()
  };

  public static getInstance(): CowsService {
    if (!CowsService.instance) {
      CowsService.instance = new CowsService();
    }
    return CowsService.instance;
  }

  async addNewCow(cow: ICow): Promise<void> {
    await this.db.addNewCow(cow);
  };

  async delCow(id: string): Promise<void> {
    await this.db.delCow(id);
  };

  async addNewCowIfNotExist(cowId: string): Promise<void> {
    const res = (await this.db.getAllCows())
    .find(currCow => currCow.id == cowId)

    if (!res) this.db.addNewCow({ id: cowId })
  }

  async getAllCows(): Promise<ICow[]> {
    return await this.db.getAllCows()
  };
};