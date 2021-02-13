import { Dollar } from 'money';

describe('Dollar', () => {
  test('testMultiplication', () => {
    const five = new Dollar(5);
    let product = five.times(2);
    expect(product.amount).toEqual(10);
    product = five.times(3);
    expect(product.amount).toEqual(15);
  });

  test('testEquality', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBe(true);
    expect(new Dollar(5).equals(new Dollar(6))).toBe(false);
  });
});
