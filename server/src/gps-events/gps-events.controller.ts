import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GpsEvent } from './interfaces/gps-event.interface';
import { GpsEventsService } from './gps-events.service';
import { CreateGpsEventDto } from './dto/create-gps-event.dto';
import { TheftAlertDto } from './dto/theft-alert.dto';

@Controller('gps-events')
export class GpsEventsController {
  constructor(private readonly gpsEventsService: GpsEventsService) {}

  @Get()
  find(): Promise<GpsEvent[]> {
    return this.gpsEventsService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GpsEvent> {
    return this.gpsEventsService.findOne(id);
  }

  @Get('by-cow-id/:cowId')
  findByCowId(@Param('cowId') cowId: string): Promise<GpsEvent[]> {
    return this.gpsEventsService.findByCowId(cowId);
  }

  @Get('find-one-by-cow-id/:cowId')
  findOneByCowId(@Param('cowId') cowId: string): Promise<GpsEvent> {
    return this.gpsEventsService.findOneByCowId(cowId);
  }

  @Post()
  create(@Body() createGpsEvent: CreateGpsEventDto): Promise<GpsEvent> {
    return this.gpsEventsService.create(createGpsEvent);
  }

  @Post('theft-alert')
  postAlert(@Body() alert: TheftAlertDto): Promise<string> {
    return this.gpsEventsService.postAlert(alert.cowId);
  }

  @Delete(':id')
  delete(@Param() id: string): Promise<GpsEvent> {
    return this.gpsEventsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateGpsEventDto: CreateGpsEventDto, @Param('id') id: string): Promise<GpsEvent> {
    return this.gpsEventsService.update(id, updateGpsEventDto);
  }
}
