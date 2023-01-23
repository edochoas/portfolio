export class Graph {
  adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.get(vertex)) {
      this.adjacencyList.set(vertex, [])
    }
  }

  addEdge(from, to) {
    this.addVertex(from);
    this.addVertex(to);
    this.adjacencyList.get(from).push(to);
  }

  getNumberOfVertex() {
    return this.adjacencyList.size;
  }
}