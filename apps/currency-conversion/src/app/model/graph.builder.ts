import { Inject, Injectable } from '@nestjs/common';
import { Graph } from './graph';

@Injectable()
export class GraphBuilder {
  constructor(@Inject('RuleLoader') private ruleLoader) {}
  build(): Graph {
    const rules = this.ruleLoader.load();
    const graph = new Graph();
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        graph.addEdge(rule);
      });
    }
    return graph;
  }
}
