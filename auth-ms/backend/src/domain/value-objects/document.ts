export class Document {
  private type: string;
  private number: number;
  private static types: string[] = ['DNI', 'CUIL', 'CUIT'];

  constructor(type: string, number: number) {
    this.type = type;
    this.number = number;
  }

  static createFrom(type: string, number: number) {
    this.isValidToCreateDocumentOrThrows(type);

    return new Document(type, number);
  }

  static isValidToCreateDocumentOrThrows(type: string) {
    if (!Document.types.includes(type))
      throw new Error('Document type is invalid');
  }

  getType() {
    return this.type;
  }

  getNumber() {
    return this.number;
  }
}
