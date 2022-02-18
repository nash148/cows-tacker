import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CowController } from './controllers/cows.controller';
import { GpsEventsController } from './controllers/gpsEvents.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, CowController, GpsEventsController],
  providers: [AppService],
})
export class AppModule {}
