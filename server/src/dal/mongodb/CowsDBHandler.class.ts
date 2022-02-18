import { connect } from 'mongoose';

import { CowModel } from './CowModel';
import { ICowsDBHandler } from '../ICowsDBHandler.interface';
import { ICow } from '../../common/interfaces/ICow.interface';

export class CowsDBHandler implements ICowsDBHandler {
  constructor() {
    connect("mongodb+srv://nash148:zq8paKYpxJcaW75@application.aesyb.mongodb.net/CowsTracker?retryWrites=true&w=majority")
  }

  async addNewCow(cow: ICow): Promise<void> {
    await new CowModel({ ...cow }).save()
  };

  async delCow(id: string): Promise<void> {
    await CowModel.deleteOne({ id })
  };

  async getAllCows(): Promise<ICow[]> {
    return await CowModel.find({})
  };
}