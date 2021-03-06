import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CowsModule } from './cows/cows.module';
import { GpsEventsModule } from './gps-events/gps-events.module';
import config from './config/keys';

@Module({
  imports: [GpsEventsModule, CowsModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
