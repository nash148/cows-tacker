import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CowController } from './controllers/cows.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, CowController],
  providers: [AppService],
})
export class AppModule {}
