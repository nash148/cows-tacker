import { NotImplementedException } from '@nestjs/common';
import { ObjectId, mongo } from 'mongoose';
import { IGpsEvent } from '../common/interfaces/IGpsEvent.interface';

export interface IGpsEventDBHandler {
  addNewGpsEvent: (gpsEvent: IGpsEvent) => Promise<void>;
  delGpsEvent: (id: ObjectId) => Promise<void>;
  getGpsEventsByCowId: (cowId: string, slice?: number[]) => Promise<IGpsEvent[]>;
  getGpsEvents: (slice?: number[]) => Promise<IGpsEvent[]>;
}