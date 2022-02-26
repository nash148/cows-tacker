import * as mongoose from 'mongoose';
import { Cow }  from '../interfaces/cow.interface';

export const CowSchema = new mongoose.Schema<Cow>({
  cowId: { type: String, required: true, unique: true }
}, { collection: 'cows'})