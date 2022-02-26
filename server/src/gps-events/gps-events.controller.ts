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

  @Post()
  create(@Body() createGpsEvent: CreateGpsEventDto): Promise<GpsEvent> {
    return this.gpsEventsService.create(createGpsEvent);
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
