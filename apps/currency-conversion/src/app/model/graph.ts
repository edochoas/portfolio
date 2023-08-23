export class Graph {
  adjacencyList: Map<string, Map<string, number>>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: string) {
    if (!this.adjacencyList.get(vertex)) {
      this.adjacencyList.set(vertex, new Map());
    }
  }

  addEdge(from: string, to: string, weight = 1) {
    this.addVertex(from);
    this.addVertex(to);
    this.adjacencyList.get(from).set(to, weight);
  }

  getNumberOfVertex() {
    return this.adjacencyList.size;
  }

  findLongestPath(from: string, to: string, amount: number): { path: string[], weight: number } {
    let longestPath = [];
    let weight = 0;
    const dfs = (current: string, currentPath: string[] = [], currentRates: number[] = []) => {
      if (current !== to) {
        const neighbors = this.adjacencyList.get(current);
        neighbors.forEach((weight, neighbor) => {
          currentPath.push(neighbor)
          currentRates.push(weight);
          dfs(neighbor, currentPath, currentRates);
        });
      } else {
        const currentWeight = currentRates.reduce((previous, current) => previous * current, amount);
        if (currentWeight > weight) {
          weight = currentWeight;
          longestPath = [...currentPath];
        }
      }
      currentPath.pop()
      currentRates.pop()
    }
    dfs(from);
    return {
      path: longestPath,
      weight
    }
  }

  dfsRecursive(from: string) {
    const paths = new Map<string, string>();
    const weights = new Map<string, number>();
    const dfs = (current: string,  currentPath: string[] = [], currentRates: number[] = [], maxWeight = 0) => {
      const neighbors = this.adjacencyList.get(current);
      neighbors.forEach((weight, neighbor) => {
        currentPath.push(neighbor)
        currentRates.push(weight);
        dfs(neighbor, currentPath, currentRates, weights.get(neighbor));
        currentPath.pop();
        currentRates.pop();
      });
      const currentWeight = currentRates.reduce((previous, current) => previous * current, 100);
      if (currentWeight > maxWeight) {
        weights.set(current, currentWeight);
        const path = currentPath.join('|');
        paths.set(current, path);
      }
    }
    dfs(from, [from], [], 0);
    console.log(paths);
  }

  dfsIterative(from: string) {
    const visited = new Set();
    const stack: string[] = [];
    stack.push(from);
    while(stack.length > 0) {
      const current = stack.pop();
      if (!visited.has(current)) {
        console.log(current);
        visited.add(current);
        const neighbors = this.adjacencyList.get(current);
        neighbors.forEach((weight, neighbor) => {
          stack.push(neighbor)
        });
      }
    }
  }
}
