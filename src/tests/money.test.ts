import { Money, Bank, Expression, Sum } from 'money';

describe('MoneyTest', () => {
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
    const five = Money.dollar(5);
    const sum = five.plus(five);
    const bank = new Bank();
    const reduced = bank.reduce(sum, 'USD');
    expect(reduced).toEqual(Money.dollar(10));
  });

  test('testPlusReturnSum', () => {
    const five = Money.dollar(5);
    const result: Expression = five.plus(five);
    const sum = result as Sum;
    expect(five).toEqual(sum.augend);
    expect(five).toEqual(sum.addend);
  });

  test('testReduceSum', () => {
    const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4));
    const bank: Bank = new Bank();
    const result: Money = bank.reduce(sum, 'USD');
    expect(Money.dollar(7)).toEqual(result);
  });

  test('testRecuceMoney', () => {
    const bank: Bank = new Bank();
    const result: Money = bank.reduce(Money.dollar(1), 'USD');
    expect(Money.dollar(1)).toEqual(result);
  });
});
