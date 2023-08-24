import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from '../application/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/convert')
  getData(
    @Query('amount') amount
  ) {
      return this.appService.calculateBestConversions(amount);
  }
}
