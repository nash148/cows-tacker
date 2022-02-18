import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { GpsEventsService } from '../services/gpsEvents.service';
import { IGpsEvent } from '../common/interfaces/IGpsEvent.interface';
import { GpsEventDto } from './validations/DTOs/GpsEventDto';
import { GetGpsEventsQuery } from './validations/DTOs/GetGpsEventsDto';
import { IdParam } from './validations/Params/IdParam';

@Controller('/gps-events')
export class GpsEventsController {
  gpsEventsService: GpsEventsService;

  constructor() {
    this.gpsEventsService = new GpsEventsService()
  };

  // TODO Add query validation  
  @Get()
  async getGpsEvents(): Promise<IGpsEvent[]> {
    return await this.gpsEventsService.getGpsEvents()
  };

  // TODO Replace Body with Query
  @Get('/by-cow-id')
  async getGpsEventsByCowId(@Body() query: GetGpsEventsQuery): Promise<IGpsEvent[]> {
    return await this.gpsEventsService.getGpsEventsByCowId(query.cowId, query.slice)
  }

  @Post()
  async addNewGpsEvent(@Body() event: GpsEventDto): Promise<IGpsEvent> {
    await this.gpsEventsService.addNewGpsEvent(event)
    return event
  }

  @Delete(':id')
  async delCow(@Param() params: IdParam): Promise<string> {
    await this.gpsEventsService.delGpsEvent(params.id)
    return params.id
  }
}
