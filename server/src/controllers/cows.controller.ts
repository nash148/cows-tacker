import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CowsService } from '../services/cows.service';
import { ICow } from '../common/interfaces/ICow.interface';
import { CowDto } from './validations/DTOs/CowDto';
import { IdParam } from './validations/Params/IdParam';

@Controller('/cows')
export class CowController {
  cowsService: CowsService;

  constructor() {
    this.cowsService = CowsService.getInstance()
  };

  @Get()
  async getAllCows(): Promise<ICow[]> {
    return await this.cowsService.getAllCows()
  }

  @Post()
  async addNewCow(@Body() cow: CowDto): Promise<ICow> {
    try {
      await this.cowsService.addNewCow(cow)
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
    return cow
  }

  @Delete(':id')
  async delCow(@Param() params: IdParam): Promise<string> {
    await this.cowsService.delCow(params.id)
    return params.id
  }
}
