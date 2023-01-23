import { Graph } from './graph';
describe('Graph', () => {
  let graph: Graph;

  beforeAll(() => {
    graph = new Graph();
  });

  it('should be created', () => {
    expect(graph).toBeTruthy();
  });

  it ('should add a vertext', () => {
    graph.addVertex('CAD');
    expect(graph.getNumberOfVertex()).toEqual(1);
  });

  it('should not add a vertex twice', () => {
    graph.addVertex('CAD');
    graph.addVertex('COP');
    graph.addVertex('CAD');
    expect(graph.getNumberOfVertex()).toEqual(2);
  });
});