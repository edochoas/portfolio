import { Module } from '@nestjs/common';

import { AppController } from './infrastructure/currency-exchange.controller';
import { CurrencyExchangeService } from './application/currency-exchange.service';
import { CurrencyExchangeCalculator } from './model/currency-exchange-calculator';
import { JSONFileLoader } from './model/json-file-loader';
import { CurrencyExchangeGraphBuilder } from './model/currency-exchange-graph.builder';
import { TransactionDetailCSVRenderer } from './model/transaction-detail-csv-renderer';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    CurrencyExchangeService,
    CurrencyExchangeCalculator,
    CurrencyExchangeGraphBuilder,
    {
      provide: 'RULE_LOADER',
      useClass: JSONFileLoader,
    },
    {
      provide: 'RENDERER',
      useClass: TransactionDetailCSVRenderer,
    },
    {
      provide: 'CURRENCY_EXCHANGE_GRAPH',
      useFactory: (graphBuilder: CurrencyExchangeGraphBuilder) =>
        graphBuilder.buildCurrencyExchangeGraph(),
      inject: [CurrencyExchangeGraphBuilder],
    },
  ],
})
export class AppModule {}
