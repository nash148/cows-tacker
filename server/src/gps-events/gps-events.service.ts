import { Injectable } from '@nestjs/common';
import {  InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GpsEvent } from './interfaces/gps-event.interface';
import { CowsService } from '../cows/cows.service';

@Injectable()
export class GpsEventsService {
  constructor(@InjectModel('GpsEvent') private readonly gpsEventModel: Model<GpsEvent>,
              private readonly cowsService: CowsService) {}

  async find(): Promise<GpsEvent[]> {
    return await this.gpsEventModel.find();
  }

  async findOne(id: string): Promise<GpsEvent> {
    return await this.gpsEventModel.findOne({ _id: id });
  }

  async create(gpsEvent: GpsEvent): Promise<GpsEvent> {
    await this.cowsService.createIfNotExist(gpsEvent.cowId);
    const newGpsEvent = new this.gpsEventModel(gpsEvent);
    return await newGpsEvent.save();
  }

  async delete(id: string): Promise<GpsEvent> {
    return await this.gpsEventModel.findByIdAndRemove(id);
  }

  async update(id: string, gpsEvent: GpsEvent): Promise<GpsEvent> {
    return await this.gpsEventModel.findByIdAndUpdate(id, gpsEvent, { new: true });
  }
}
