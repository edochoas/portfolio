import { ExchangeRule } from "./exchange-rule";
import { PathMap } from "./path-map";

export class Graph {
  adjacencyList: Map<string, Map<string, number>>;
  nodeMetadata: Map<string, { currencyName: string }>;

  constructor() {
    this.adjacencyList = new Map();
    this.nodeMetadata = new Map();
  }

  addVertex(vertex: string, metadata: string) {
    if (!this.adjacencyList.get(vertex)) {
      this.adjacencyList.set(vertex, new Map());
      this.nodeMetadata.set(vertex, { currencyName: metadata })
    }
  }

  addEdge(rule: ExchangeRule) {
    this.addVertex(rule.fromCurrencyCode, rule.fromCurrencyName);
    this.addVertex(rule.toCurrencyCode, rule.toCurrencyName);
    this.adjacencyList.get(rule.fromCurrencyCode).set(rule.toCurrencyCode, rule.exchangeRate);
  }

  getNumberOfVertex() {
    return this.adjacencyList.size;
  }

  getNodeMetadata(vertex: string) {
    return this.nodeMetadata.get(vertex);
  }

  findLongestPathsFrom(fromNode: string): PathMap {
    const longestPaths: PathMap = new Map();
    const pathWeights = new Map<string, number>();

    const deepFirstSearch = (currentNode: string,  currentPath = [], currentWeights: number[] = [], maxWeight = 0) => {
      const neighbors = this.adjacencyList.get(currentNode);
      neighbors.forEach((weight, neighbor) => {
        currentPath.push({ name: neighbor, weight });
        currentWeights.push(weight);

        deepFirstSearch(neighbor, currentPath, currentWeights, pathWeights.get(neighbor));
        
        currentPath.pop();
        currentWeights.pop();
      });
      const currentPathWeight = currentWeights.reduce((previous, current) => previous * current, 100);
      if (currentPathWeight > maxWeight) {
        pathWeights.set(currentNode, currentPathWeight);
        longestPaths.set(currentNode, [...currentPath]);
      }
    }
    deepFirstSearch(fromNode, [], [], 0);
    longestPaths.delete('CAD');
    return longestPaths;
  }

  // dfsIterative(from: string) {
  //   const visited = new Set();
  //   const stack: string[] = [];
  //   stack.push(from);
  //   while(stack.length > 0) {
  //     const current = stack.pop();
  //     if (!visited.has(current)) {
  //       console.log(current);
  //       visited.add(current);
  //       const neighbors = this.adjacencyList.get(current);
  //       neighbors.forEach((weight, neighbor) => {
  //         stack.push(neighbor)
  //       });
  //     }
  //   }
  // }
}
