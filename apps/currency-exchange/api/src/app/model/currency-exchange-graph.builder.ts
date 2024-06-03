import { Inject, Injectable } from '@nestjs/common';
import { CurrencyExchangeGraph } from './currency-exchange-graph';

@Injectable()
export class CurrencyExchangeGraphBuilder {
  constructor(@Inject('RULE_LOADER') private ruleLoader) {}
  buildCurrencyExchangeGraph(): CurrencyExchangeGraph {
    const exchangeRateRules = this.ruleLoader.load();
    const graph = new CurrencyExchangeGraph();
    if (Array.isArray(exchangeRateRules)) {
      exchangeRateRules.forEach((rule) => {
        graph.addExchangeRate(rule);
      });
    }
    return graph;
  }
}
