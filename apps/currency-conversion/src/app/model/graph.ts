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
}
