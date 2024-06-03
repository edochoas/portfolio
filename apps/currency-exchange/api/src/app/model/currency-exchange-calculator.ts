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

  private formatConversionPath(path: GraphNode[]) {
    return path.map((node) => node.name).join('|');
  }

  private calculateConvertedAmountFromPath(
    path: GraphNode[],
    amount: number
  ): number {
    let convertedAmount = amount;
    for (const node of path) {
      convertedAmount = node.weight * convertedAmount;
    }
    return convertedAmount;
  }

  private getCountryForCurrency(currency: string) {
    const { currencyName } = this.conversionGraph.getCurrencyMetadata(currency);
    const currencyArray = currencyName.split(' ');
    return currencyArray.length > 1
      ? currencyArray.splice(0, currencyArray.length - 1).join(' ')
      : currencyName;
  }
}
