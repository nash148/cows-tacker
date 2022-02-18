import { connect, ObjectId } from 'mongoose';

import { GpsEventModel } from './GpsEventModel';
import { IGpsEventDBHandler } from '../IGpsEventsDBHandler.interface';
import { IGpsEvent } from '../../common/interfaces/IGpsEvent.interface';

export class GpsEventsDBHandler implements IGpsEventDBHandler {
  constructor() {
    connect("mongodb+srv://nash148:zq8paKYpxJcaW75@application.aesyb.mongodb.net/CowsTracker?retryWrites=true&w=majority")
  }

  async addNewGpsEvent(event: IGpsEvent): Promise<void> {
    await new GpsEventModel({ ...event }).save()
  };

  async delGpsEvent(id: ObjectId): Promise<void> {
    await GpsEventModel.deleteOne({ _id: id })
  };

  async getGpsEventsByCowId(cowId: string, slice?: number[]): Promise<IGpsEvent[]> {
    // TODO Add slice query
    return await GpsEventModel.find({ cowId })
  };

  async getGpsEvents(slice?: number[]): Promise<IGpsEvent[]> {
    // TODO Add slice query
    return await GpsEventModel.find({})
  };
};