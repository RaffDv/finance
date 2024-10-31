import { Controller, Get } from '@nestjs/common';
import { ExpanseService } from './expanse.service';

@Controller('expanse')
export class ExpanseController {
  constructor(private readonly expanseService: ExpanseService) {}
  @Get('/month/total')
  async totalMonthExpanses() {
    return await this.expanseService.getMonthExpansesFromApi();
  }
}
