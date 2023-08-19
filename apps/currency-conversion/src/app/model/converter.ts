import { Injectable } from '@nestjs/common';
import { GraphBuilder } from './graph.builder';
import { Graph } from './graph';

@Injectable()
export class Converter {
  graph: Graph;
  constructor(private graphBuider: GraphBuilder) {
    this.graph = graphBuider.build();
    // console.log("🚀 ~ file: converter.ts:10 ~ Converter ~ constructor ~ graph:", this.graph.adjacencyList)
  }
}
