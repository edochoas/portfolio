import { Inject, Injectable } from '@nestjs/common';
import { Graph } from './graph';
import { PathMap } from './path-map';

@Injectable()
export class Converter {
  pathMap: PathMap;
  constructor(@Inject('Graph') private conversionGraph: Graph) {
    this.pathMap = conversionGraph.findLongestPathsFrom('CAD');
  }

  findBestConversionRates(amount: number) {
    this.pathMap.forEach((nodePath, currency) => {
      let convertedAmount = amount;
      let conversionPath = '';
      nodePath.forEach((node,) => {
        convertedAmount = node.weight * convertedAmount;
        conversionPath += `|${node.name}`;
      });
      const { currencyName } = this.conversionGraph.getNodeMetadata(currency);
      const currencyArray = currencyName.split(' ');
      const country = currencyArray.length > 1 ? currencyArray.splice(0, currencyArray.length -1).join(' ') : currencyName;
      console.log(`currency: ${currency}, country: ${country}, amount: ${convertedAmount}, path: ${conversionPath}`);
    });
  }
}
