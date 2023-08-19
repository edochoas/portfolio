import { FileLoader } from './file-loader';

describe('FileLoader', () => {
  it('should be defined', () => {
    expect(new FileLoader()).toBeDefined();
  });

  describe('load method', () => {
    it('should return a list of rules', () => {
      const fileLoader = new FileLoader();
      const rules = fileLoader.load();
      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
    });
  })
});
