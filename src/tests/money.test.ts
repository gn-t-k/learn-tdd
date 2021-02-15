import { Money } from 'money';

describe('Dollar', () => {
  test('testMultiplication', () => {
    const five = Money.dollar(5);
    expect(five.times(2)).toEqual(Money.dollar(10));
    expect(five.times(3)).toEqual(Money.dollar(15));
  });

  test('testEquality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);
    expect(Money.dollar(5).equals(Money.franc(5))).toBe(false);
  });

  test('testCurrency', () => {
    expect(Money.dollar(1).getCurrency()).toEqual('USD');
    expect(Money.franc(1).getCurrency()).toEqual('CHF');
  });

  test('testSimpleAddition', () => {
    const sum = Money.dollar(5).plus(Money.dollar(5));
    expect(sum).toEqual(Money.dollar(10));
  });
});
