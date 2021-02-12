import { Dollar } from 'money';

describe('Dollar', () => {
  test('testMultiplication', () => {
    const five = new Dollar(5);
    five.times(2);
    expect(five.amount).toEqual(10);
    five.times(3);
    expect(five.amount).toEqual(15);
  });
});
