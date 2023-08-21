import { Module } from '@nestjs/common';

import { AppController } from './infrastructure/app.controller';
import { AppService } from './application/app.service';
import { Converter } from './model/converter';
import { JSONFileLoader } from './model/json-file-loader';
import { GraphBuilder } from './model/graph.builder';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    Converter,
    GraphBuilder,
    {
      provide: 'RuleLoader',
      useClass: JSONFileLoader
    }, 
    {
      provide: 'Graph',
      useFactory: (graphBuilder: GraphBuilder) => graphBuilder.build(),
      inject: [GraphBuilder]
    }
  ],
})
export class AppModule {}
