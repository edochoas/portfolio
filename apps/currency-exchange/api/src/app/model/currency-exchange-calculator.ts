import { Inject, Injectable } from '@nestjs/common';
import { CurrencyExchangeGraph } from './currency-exchange-graph';
import { GraphNode, PathMap } from './path-map';
import { TransactionDetail } from './transaction-detail-renderer';

@Injectable()
export class CurrencyExchangeCalculator {
  pathMap: PathMap;
  constructor(
    @Inject('CURRENCY_EXCHANGE_GRAPH')
    private conversionGraph: CurrencyExchangeGraph
  ) {
    this.pathMap = conversionGraph.findBestExchangeRates('CAD');
  }

  calculateBestExchangeRates(amount: number): TransactionDetail[] {
    const transactionDetails: TransactionDetail[] = [];
    this.pathMap.forEach((path, currency) => {
      const convertedAmount = this.calculateConvertedAmountFromPath(
        path,
        amount
      );
      const conversionPath = this.formatConversionPath(path);
      const country = this.getCountryForCurrency(currency);
      transactionDetails.push({
        currencyCode: currency,
        country,
        amount: convertedAmount,
        path: conversionPath,
      });
    });
    return transactionDetails;
  }

  findBestConversion(amount: number, currency: string) {
    const path = this.pathMap.get(currency);
    return this.getConversionPath(path, amount);
  }

  getAvailableCurrencies() {
    const currencyList = [];
    this.conversionGraph.nodeMetadata.forEach((value, key) => {
      if (key !== "CAD") {
        currencyList.push({
          currencyName: value.currencyName,
          currencyCode: key
        })
      }
    })
    return currencyList;
  }

  private formatConversionPath(path: GraphNode[]) {
    return path.map((node) => node.name).join('|');
  }

  private calculateConvertedAmountFromPath(
    path: GraphNode[],
    amount: number
  ): number {
    let convertedAmount = amount;
    for (const node of path) {
      convertedAmount *= node.weight;
    }
    return convertedAmount;
  }

  private getConversionPath( path: GraphNode[], amount: number) {
    const conversionPath = [];
    let convertedAmount = amount;
    for (const node of path) {
      convertedAmount *= node.weight;
      conversionPath.push({
        currencyCode: node.name,
        exchangeRate: node.weight,
        convertedAmount: convertedAmount
      })
    }
    return {
      amount: convertedAmount,
      path: conversionPath
    }
  }

  private getCountryForCurrency(currency: string) {
    const { currencyName } = this.conversionGraph.getCurrencyMetadata(currency);
    const currencyArray = currencyName.split(' ');
    return currencyArray.length > 1
      ? currencyArray.splice(0, currencyArray.length - 1).join(' ')
      : currencyName;
  }
}
