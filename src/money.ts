export class Money {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  equals(money: Money): boolean {
    return this.amount === money.amount;
  }
}
