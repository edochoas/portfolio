import { Controller, Get, Header, Query } from '@nestjs/common';

import { CurrencyExchangeService } from '../application/currency-exchange.service';

@Controller()
export class AppController {
  constructor(private readonly appService: CurrencyExchangeService) {}

  @Get('/exchange')
  @Header(
    'Content-Disposition',
    'attachment; filename="transaction-details.csv'
  )
  getData(@Query('amount') amount) {
    return this.appService.calculateBestExchangeRates(amount);
  }
}
