import lib from '../src/index.js';

const { generate, verify, generateSync, verifySync } = lib;

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

  it('should have a generateSync property', () => {
    expect(lib).toHaveProperty('generateSync');
  });

  test('generateSync should be a function', () => {
    expect(generateSync).toBeInstanceOf(Function);
  });

  it('should have a verify property', () => {
    expect(lib).toHaveProperty('verify');
  });

  test('verify should be a function', () => {
    expect(verify).toBeInstanceOf(Function);
  });

  it('should have a verifySync property', () => {
    expect(lib).toHaveProperty('verifySync');
  });

  test('verifySync should be a function', () => {
    expect(verifySync).toBeInstanceOf(Function);
  });
});
