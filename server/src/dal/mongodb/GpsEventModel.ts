import { Schema, model } from 'mongoose';

import { IGpsEvent } from '../../common/interfaces/IGpsEvent.interface';


const gpsEvent = new Schema<IGpsEvent>({
  cowId: {type: String, required: true},
  timestamp: { type: String, required: true },
  latLong: { type: String, required: false },
  wt: { type: String, required: true },
  battery: {type: String, required: true}
}, { collection: 'gpsEvents'});

export const GpsEventModel = model<IGpsEvent>('GpsEvent', gpsEvent);