import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from '../application/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/convert')
  getData(
    @Query('from') from,
    @Query('to') to,
    @Query('amount') amount
  ) {
      this.appService.calculateBestConversion(from, to, amount);
      return "fake data";
  }
}
