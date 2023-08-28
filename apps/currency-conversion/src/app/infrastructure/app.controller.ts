import { Controller, Get, Header, Query } from '@nestjs/common';

import { AppService } from '../application/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/convert')
  @Header('Content-Disposition', 'attachment; filename="transaction-details.csv')
  getData(
    @Query('amount') amount
  ) {
      return this.appService.calculateBestConversions(amount);
  }
}
