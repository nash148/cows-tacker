import { Injectable } from '@nestjs/common';
import { Schema } from 'mongoose';
import { IGpsEvent } from '../common/interfaces/IGpsEvent.interface';
import { IGpsEventDBHandler } from '../dal/IGpsEventsDBHandler.interface';
import { GpsEventsDBHandler } from '../dal/mongodb/GpsEventsDBHandler.class';
import { CowsService } from './cows.service';

@Injectable()
export class GpsEventsService {
  static instance: GpsEventsService;
  private db: IGpsEventDBHandler;
  private cowsService: CowsService;

  constructor(){
    this.db = new GpsEventsDBHandler()
    this.cowsService = CowsService.getInstance()
  };

  public static getInstance(): GpsEventsService {
    if (!GpsEventsService.instance) {
      GpsEventsService.instance = new GpsEventsService();
    }
    return GpsEventsService.instance;
  }

  async addNewGpsEvent(event: IGpsEvent): Promise<void> {
    await this.cowsService.addNewCowIfNotExist(event.cowId)
    await this.db.addNewGpsEvent(event)
    // TODO Send to the client in websocket or something
  };

  async delGpsEvent(id: string): Promise<void> {
    await this.db.delGpsEvent(new Schema.Types.ObjectId(id))
  };

  async getGpsEventsByCowId(cowId: string, slice?: number[]): Promise<IGpsEvent[]> {
    return await this.db.getGpsEventsByCowId(cowId, slice)
  };

  async getGpsEvents(slice?: number[]): Promise<IGpsEvent[]> {
      return await this.db.getGpsEvents(slice)
  };
};