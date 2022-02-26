import * as mongoose from 'mongoose';
import { GpsEvent } from '../interfaces/gps-event.interface';


export const GpsEventSchema = new mongoose.Schema<GpsEvent>({
  cowId: {type: String, required: true},
  timestamp: { type: String, required: true },
  latLong: { type: String, required: false },
  wt: { type: String, required: true },
  battery: {type: String, required: true}
}, { collection: 'gpsEvents'});