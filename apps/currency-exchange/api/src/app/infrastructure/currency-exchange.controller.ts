import { Controller, Get, Header, ParseIntPipe, Query } from '@nestjs/common';
import { CurrencyExchangeService } from '../application/currency-exchange.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: CurrencyExchangeService) {}

  // @ApiQuery({
  //   name: 'amount',
  //   description: 'amount to exchage',
  // })
  // @Get('/exchange')
  // @Header(
  //   'Content-Disposition',
  //   'attachment; filename="transaction-details.csv'
  // )
  // getData(@Query('amount', ParseIntPipe) amount: number) {
  //   return this.appService.calculateBestExchangeRates(amount);
  // }

  @Get('/convert')
  @ApiQuery({
    name: 'amount',
    description: 'amount to convert',
  })
  @ApiQuery({
    name: 'currency',
    description: 'target currency',
  })
  getBestConversion(@Query('amount') amount, @Query('currency') currency) {
    return this.appService.findBestConversion(amount, currency)
  }

  @Get('/currencies')
  getCurrencies() {
    return this.appService.getCurrencies();
  }
}
