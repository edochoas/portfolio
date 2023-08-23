import { Inject, Injectable } from '@nestjs/common';
import { Graph } from './graph';

@Injectable()
export class Converter {
  constructor(@Inject('Graph') private conversionGraph: Graph) {
    conversionGraph.dfsRecursive('CAD');
  }

  findBestConversionRate(from: string, to: string, amount: number) {
    const { path, weight } = this.conversionGraph.findLongestPath(from, to, amount);
    const conversionAmount = amount * weight;
    path.unshift(from);
    const conversionPath = path.reduce((previous, current) => `${previous} -> ${current}`);
    return {
      conversion: {
        amount: conversionAmount.toFixed(2),
        path: conversionPath
      }
    }
  } 
}
