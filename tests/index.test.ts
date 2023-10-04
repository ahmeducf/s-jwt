import lib from '../src/index';

const { generate, verify } = lib;

describe('S-JWT library API', () => {
  it('should export an object', () => {
    expect(lib).toBeInstanceOf(Object);
  });

  it('should have a generate property', () => {
    expect(lib).toHaveProperty('generate');
  });

  test('generate should be a function', () => {
    expect(generate).toBeInstanceOf(Function);
  });

  it('should have a verify property', () => {
    expect(lib).toHaveProperty('verify');
  });

  test('verify should be a function', () => {
    expect(verify).toBeInstanceOf(Function);
  });
});
