export interface Expression {
  reduce(bank: Bank, to: string): Money;
}

export class Sum implements Expression {
  augend: Money;
  addend: Money;

  constructor(augend: Money, addend: Money) {
    this.augend = augend;
    this.addend = addend;
  }

  public reduce(bank: Bank, to: string): Money {
    const amount: number = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}

export class Bank {
  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }

  addRate(from: string, to: string, rate: number) {}

  rate(from: string, to: string): number {
    return from === 'CHF' && to === 'USD' ? 2 : 1;
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

  plus(addend: Money): Expression {
    return new Sum(this, addend);
  }

  public reduce(bank: Bank, to: string): Money {
    const rate: number = bank.rate(this.currency, to);
    return new Money(this.amount / rate, to);
  }

  getCurrency(): string {
    return this.currency;
  }

  public equals(money: Money): boolean {
    return this.amount === money.amount && money.currency === this.currency;
  }

  public toString(): string {
    return this.amount + ' ' + this.currency;
  }

  static dollar(amount: number): Money {
    return new Money(amount, 'USD');
  }

  static franc(amount: number): Money {
    return new Money(amount, 'CHF');
  }
}
