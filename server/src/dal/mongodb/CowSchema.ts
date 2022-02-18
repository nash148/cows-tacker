import { Schema, model } from 'mongoose';

import { ICow } from '../../common/interfaces/ICow.interface';


const cowSchema = new Schema<ICow>({
  id: { type: String, required: true, unique: true },
  gpsEvents: { type: [{}], required: true }
}, { collection: 'cows'});

export const CowModel = model<ICow>('Cow', cowSchema);