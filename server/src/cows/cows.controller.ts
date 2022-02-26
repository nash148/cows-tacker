import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateCowDto } from './dto/create-cow.dto';
import { Cow } from './interfaces/cow.interface';
import { CowsService } from './cows.service';

@Controller('cows')
export class CowsController {
  constructor(private readonly cowsService: CowsService) {}

  @Get()
  find(): Promise<Cow[]> {
    return this.cowsService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cow> {
    return this.cowsService.findOne(id);
  }

  @Post()
  create(@Body() createCow: CreateCowDto): Promise<Cow> {
    return this.cowsService.create(createCow);
  }

  @Delete(':id')
  delete(@Param() id: string): Promise<Cow> {
    return this.cowsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateCowDto: CreateCowDto, @Param('id') id: string): Promise<Cow> {
    return this.cowsService.update(id, updateCowDto);
  }
}
