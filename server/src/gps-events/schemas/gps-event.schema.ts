import * as mongoose from 'mongoose';
import { GpsEvent } from '../interfaces/gps-event.interface';


export const GpsEventSchema = new mongoose.Schema<GpsEvent>({
  cowId: {type: String, required: true},
  timestamp: { type: Number, required: true },
  latLong: { type: [Number] , required: false },
  tw: { type: String, required: true },
  battery: {type: String, required: true},
  counter: {type: Number, required: true}
}, { collection: 'gpsEvents'});