import { CurrencyExchangeGraphBuilder } from './currency-exchange-graph.builder';

const data = [
  {
    exchangeRate: 6.207200591992744,
    fromCurrencyCode: 'CAD',
    fromCurrencyName: 'Canada Dollar',
    toCurrencyCode: 'HKD',
    toCurrencyName: 'Hong Kong Dollar',
  },
  {
    exchangeRate: 0.7970238165520759,
    fromCurrencyCode: 'CAD',
    fromCurrencyName: 'Canada Dollar',
    toCurrencyCode: 'USD',
    toCurrencyName: 'USA Dollar',
  },
  {
    exchangeRate: 0.5755630414335434,
    fromCurrencyCode: 'USD',
    fromCurrencyName: 'USA Dollar',
    toCurrencyCode: 'HKD',
    toCurrencyName: 'Hong Kong Dollar',
  },
];

describe('GraphBuilder', () => {
  let builder: CurrencyExchangeGraphBuilder;

  beforeAll(() => {
    builder = new CurrencyExchangeGraphBuilder();
  });

  it('should be created', () => {
    expect(builder).toBeTruthy();
  });

  it('should generate a graph from JSON', () => {
    const graph = builder.fromJSON(data);
    console.log(graph);
  });
});
