import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GpsEventsController } from './gps-events.controller';
import { GpsEventsService } from './gps-events.service';
import { GpsEventSchema } from './schemas/gps-event.schema';
import { CowsModule } from '../cows/cows.module';
import { GpsEventsGateway } from './gps-events.gateway';

@Module({
  imports: [CowsModule, MongooseModule.forFeature([{ name: 'GpsEvent', schema: GpsEventSchema }])],
  controllers: [GpsEventsController],
  providers: [GpsEventsService, GpsEventsGateway],
})
export class GpsEventsModule {}
