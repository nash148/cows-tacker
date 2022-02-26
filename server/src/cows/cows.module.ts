import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CowsController } from '././cows.controller';
import { CowsService } from './cows.service';
import { CowSchema } from './schemas/cow.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cow', schema: CowSchema }])],
  controllers: [CowsController],
  providers: [CowsService],
  exports: [CowsService]
})
export class CowsModule {}
