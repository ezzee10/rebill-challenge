export class Document {
  private type: string;
  private number: number;

  constructor(type: string, number: number) {
    this.type = type;
    this.number = number;
  }

  getType() {
    return this.type;
  }

  getNumber() {
    return this.number;
  }
}
