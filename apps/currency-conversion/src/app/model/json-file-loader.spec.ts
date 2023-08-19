import { JSONFileLoader } from './json-file-loader';

describe('JSONFileLoader', () => {
  it('should be defined', () => {
    expect(new JSONFileLoader()).toBeDefined();
  });

  describe('load method', () => {
    it('should return a list of rules', () => {
      const jsonLoader = new JSONFileLoader();
      const rules = jsonLoader.load();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });
  })
});
