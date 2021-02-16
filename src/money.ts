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
    const amount: number = this.augend.getAmount() + this.addend.getAmount();
    return new Money(amount, to);
  }
}

export class Bank {
  private rates = new Map<string, number>();

  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }

  addRate(from: string, to: string, rate: number) {
    const key = new RateKey(from, to).value;
    this.rates.set(key, rate);
  }

  rate(from: string, to: string): number {
    if (from === to) return 1;
    const key = new RateKey(from, to).value;
    const rate = this.rates.get(key) as number;
    return rate;
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

  getAmount(): number {
    return this.amount;
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

export class Pair {
  private from: string;
  private to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  public equals(pair: Pair) {
    return this.from === pair.from && this.to === pair.to;
  }

  public hashCode() {
    return 0;
  }
}

class RateKey {
  constructor(private from: string, private to: string) {}

  get value(): string {
    return `${this.from}:${this.to}`;
  }

  equals(key: RateKey): boolean {
    return this.from === key.from && this.to === key.to;
  }
}
