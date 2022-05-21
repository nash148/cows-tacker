import { Injectable, Logger } from '@nestjs/common';
import {  InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GpsEvent } from './interfaces/gps-event.interface';
import { CowsService } from '../cows/cows.service';
import { Server } from 'socket.io';

@Injectable()
export class GpsEventsService {
  private socketServer: Server;
  private logger: Logger = new Logger('GpsEventsService')

  constructor(@InjectModel('GpsEvent') private readonly gpsEventModel: Model<GpsEvent>,
              private readonly cowsService: CowsService) {}

  async find(): Promise<GpsEvent[]> {
    return await this.gpsEventModel.find();
  }

  async findOne(id: string): Promise<GpsEvent> {
    return await this.gpsEventModel.findOne({ _id: id });
  }

  async findByCowId(cowId: string): Promise<GpsEvent[]> {
    return await this.gpsEventModel.find({ cowId }).sort({ $natural: -1 });
  }

  async findOneByCowId(cowId: string): Promise<GpsEvent> {
    return await this.gpsEventModel.findOne({ cowId }).sort({ $natural: -1 });
  }

  async create(gpsEvent: GpsEvent): Promise<GpsEvent> {
    await this.cowsService.createIfNotExist(gpsEvent.cowId);
    this.emitGpsEvent(gpsEvent);
    return await new this.gpsEventModel(gpsEvent).save();
  }

  async delete(id: string): Promise<GpsEvent> {
    return await this.gpsEventModel.findByIdAndRemove(id);
  }

  async deleteHistoryByCowId(cowId: string): Promise<void> {
    await this.gpsEventModel.deleteMany({ cowId, });
  }

  async update(id: string, gpsEvent: GpsEvent): Promise<GpsEvent> {
    return await this.gpsEventModel.findByIdAndUpdate(id, gpsEvent, { new: true });
  }

  async postAlert(cowId: string): Promise<string> {
    this.emitAlert(cowId)
    return cowId;
  }


  setSocketServer(server: Server): void {
    this.socketServer = server;
    this.logger.log('Init socket server');
  }

  emitGpsEvent(event: GpsEvent): void {
    if (this.socketServer) {
      this.logger.log(`Emit gps event for ${event.cowId}`);
      this.socketServer.emit('gps-event', event);
    } else {
      this.logger.warn('No socket server on emit gps event')
    } 
  }

  emitAlert(cowId: string): void {
    if (this.socketServer) {
      this.logger.log(`Emit gps alert for ${cowId}`);
      this.socketServer.emit('theft-alert', cowId);
    } else {
      this.logger.warn('No socket server on emit gps event')
    } 
  }
}
