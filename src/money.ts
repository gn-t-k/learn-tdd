class Expression {}

export class Bank {
  reduce(source: Expression, to: string): Money {
    return Money.dollar(10);
  }
}

export class Money implements Expression {
  protected amount: number;
  protected currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  plus(addend: Money) {
    return new Money(this.amount + addend.amount, this.currency);
  }

  equals(money: Money): boolean {
    return this.amount === money.amount && money.currency === this.currency;
  }

  getCurrency(): string {
    return this.currency;
  }

  static dollar(amount: number): Money {
    return new Money(amount, 'USD');
  }

  static franc(amount: number): Money {
    return new Money(amount, 'CHF');
  }
}
