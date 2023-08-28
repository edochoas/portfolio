import { Inject, Injectable } from '@nestjs/common';
import { Graph } from './graph';
import { GraphNode, PathMap } from './path-map';
import { TransactionDetail } from './renderer';

@Injectable()
export class Converter {
  pathMap: PathMap;
  constructor(@Inject('Graph') private conversionGraph: Graph) {
    this.pathMap = conversionGraph.findLongestPathsFrom('CAD');
  }

  findBestConversionRates(amount: number): TransactionDetail[] {
    const transactionDetails: TransactionDetail[] = [];
    this.pathMap.forEach((path, currency) => {
      const convertedAmount = this.calculateConvertedAmount(path, amount);
      const conversionPath = this.formatPath(path);
      const country = this.getCountryFromCurrency(currency);
      transactionDetails.push({
        currencyCode: currency, 
        country, 
        amount: convertedAmount.toFixed(2), 
        path: conversionPath 
      });
    });
    return transactionDetails;
  }

  private formatPath(path: GraphNode[]) {
    return path.map((node) => node.name).join('|');
  }

  private calculateConvertedAmount(path: GraphNode[], amount: number): number {
    let convertedAmount = amount;
    for (const node of path) {
      convertedAmount = node.weight * convertedAmount;
    }
    return convertedAmount;
  }
  
  private getCountryFromCurrency(currency: string) {
    const { currencyName } = this.conversionGraph.getNodeMetadata(currency);
    const currencyArray = currencyName.split(' ');
    return currencyArray.length > 1 ? currencyArray.splice(0, currencyArray.length -1).join(' ') : currencyName;
  }   
}  