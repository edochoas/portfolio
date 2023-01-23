import { Graph } from './graph';

export interface Currency {
  exchangeRate: number;
  fromCurrencyCode: string;
  fromCurrencyName: string;
  toCurrencyCode: string;
  toCurrencyName: string;
}

export class GraphBuilder {
  fromJSON(data: Currency[]): Graph {
    const graph = new Graph();
    if (data !== undefined && data !== null && Array.isArray(data)) {
      data.forEach(currency => {
        graph.addEdge(currency.fromCurrencyCode, currency.toCurrencyCode);
      });
    }
    return graph;
  }
}
