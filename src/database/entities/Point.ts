class Point {
  private userId: string;
  private number: number;

  public constructor(userId: string, number: number = 0) {
    this.userId = userId;
    this.number = number;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getNumber(): number {
    return this.number;
  }

  public setNumber(number: number) {
    this.number = number;
  }
}

export { Point };
