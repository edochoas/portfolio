import { ExchangeRule } from './exchange-rule';
import { PathMap } from './path-map';

export class CurrencyExchangeGraph {
  adjacencyList: Map<string, Map<string, number>>;
  nodeMetadata: Map<string, { currencyName: string }>;

  constructor() {
    this.adjacencyList = new Map();
    this.nodeMetadata = new Map();
  }

  addCurrency(currency: string, metadata: string) {
    if (!this.adjacencyList.get(currency)) {
      this.adjacencyList.set(currency, new Map());
      this.nodeMetadata.set(currency, { currencyName: metadata });
    }
  }

  addExchangeRate(rule: ExchangeRule) {
    this.addCurrency(rule.fromCurrencyCode, rule.fromCurrencyName);
    this.addCurrency(rule.toCurrencyCode, rule.toCurrencyName);
    this.adjacencyList
      .get(rule.fromCurrencyCode)
      .set(rule.toCurrencyCode, rule.exchangeRate);
  }

  getNumberOfCurrencies() {
    return this.adjacencyList.size;
  }

  getCurrencyMetadata(currency: string) {
    return this.nodeMetadata.get(currency);
  }

  findBestExchangeRates(fromNode: string): PathMap {
    const longestPaths: PathMap = new Map();
    const pathWeights = new Map<string, number>();

    const deepFirstSearch = (
      currentCurrency: string,
      currentPath = [],
      currentWeights: number[] = [],
      maxWeight = 0
    ) => {
      const neighbors = this.adjacencyList.get(currentCurrency);
      neighbors.forEach((weight, neighbor) => {
        currentPath.push({ name: neighbor, weight });
        currentWeights.push(weight);

        deepFirstSearch(
          neighbor,
          currentPath,
          currentWeights,
          pathWeights.get(neighbor)
        );

        currentPath.pop();
        currentWeights.pop();
      });
      const currentPathWeight = currentWeights.reduce(
        (previous, current) => previous * current,
        100
      );
      if (currentPathWeight > maxWeight) {
        pathWeights.set(currentCurrency, currentPathWeight);
        longestPaths.set(currentCurrency, [...currentPath]);
      }
    };
    deepFirstSearch(fromNode, [], [], 0);
    longestPaths.delete('CAD');
    return longestPaths;
  }
}
