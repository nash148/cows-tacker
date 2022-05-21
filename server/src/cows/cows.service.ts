import { Injectable } from '@nestjs/common';
import {  InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cow } from './interfaces/cow.interface';

@Injectable()
export class CowsService {
  constructor(@InjectModel('Cow') private readonly cowModel: Model<Cow>) {}

  async find(): Promise<Cow[]> {
    return await this.cowModel.find();
  }

  async findOne(id: string): Promise<Cow> {
    return await this.cowModel.findOne({ _id: id });
  }

  async create(cow: Cow): Promise<Cow> {
    return await new this.cowModel(cow).save();
  }
  
  async delete(id: string): Promise<Cow> {
    return await this.cowModel.findByIdAndRemove(id);
  }

  async update(id: string, cow: Cow): Promise<Cow> {
    return await this.cowModel.findByIdAndUpdate(id, cow, { new: true });
  }

  async createIfNotExist(cowId: string): Promise<void> {
    const isExists = (await this.cowModel.find())
    .find(currCow => currCow.cowId == cowId)

    if (!isExists) this.create({ cowId })
  }
}
