import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GpsEventsController } from './gps-events.controller';
import { GpsEventsService } from './gps-events.service';
import { GpsEventSchema } from './schemas/gps-event.schema';
import { CowsModule } from '../cows/cows.module';

@Module({
  imports: [CowsModule, MongooseModule.forFeature([{ name: 'GpsEvent', schema: GpsEventSchema }])],
  controllers: [GpsEventsController],
  providers: [GpsEventsService],
})
export class GpsEventsModule {}
