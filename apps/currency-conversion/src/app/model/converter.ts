import { Injectable } from '@nestjs/common';
import { GraphBuilder } from './graph.builder';
import { Graph } from './graph';

@Injectable()
export class Converter {
  graph: Graph;
  constructor(private graphBuider: GraphBuilder) {
    this.graph = graphBuider.build();
  }

  findBestConversionRate(from: string, to: string, amount: number) {
    const { path, weight } = this.graph.findLongestPath(from, to, amount);
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
