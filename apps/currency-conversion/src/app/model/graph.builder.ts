import { ExchangeRule } from './exchange-rule';
import { Graph } from './graph';

export class GraphBuilder {
  fromJSON(data: ExchangeRule[]): Graph {
    const graph = new Graph();
    if (data !== undefined && data !== null && Array.isArray(data)) {
      data.forEach(rule => {
        graph.addEdge(rule.fromCurrencyCode, rule.toCurrencyCode);
      });
    }
    return graph;
  }
}
