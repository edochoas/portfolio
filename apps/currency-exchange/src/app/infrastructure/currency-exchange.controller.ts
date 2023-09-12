import { Controller, Get, Header, Query } from '@nestjs/common';
import { CurrencyExchangeService } from '../application/currency-exchange.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: CurrencyExchangeService) {}

  @ApiQuery({
    name: 'amount',
    description: 'amount to exchage'
  })
  @Get('/exchange')
  @Header(
    'Content-Disposition',
    'attachment; filename="transaction-details.csv'
  )
  getData(@Query('amount') amount: string) {
    const amountNumber = Number(amount);
    return this.appService.calculateBestExchangeRates(amountNumber);
  }
}
