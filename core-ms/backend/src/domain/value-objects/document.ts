export class Document {
  private type: string;
  private number: number;
  private static types: string[] = ['DNI', 'CUIL', 'CUIT'];
  //TODO: MODELAR RESPUESTAS DE ERROR
  static DOCUMENT_ERROR_MESSAGE = 'Document is invalid';

  constructor(type: string, number: number) {
    this.type = type;
    this.number = number;
  }

  static createFrom(type: string, number: number) {
    this.isValidToCreateDocumentOrThrows(type, number);

    return new Document(type, number);
  }

  static isValidToCreateDocumentOrThrows(type: string, number: number) {
    if (!this.isValidType(type) || !this.isValidNumber(number))
      throw new Error(Document.DOCUMENT_ERROR_MESSAGE);
  }

  static isValidType(type: string) {
    if (Document.types.includes(type)) return true;
    return false;
  }

  /* TODO: Se deberían poder validar todos los numeros ya sea dni, cuit, cuil 
    habría que definir la lógica de dominio en este caso, pero lo acorto para no generar tantas validaciones
    se podría implementar un patrón strategy para poder implementar diferentes instancias dependiendo el tipo de documento
    en la cual cada una de ellas tenga su propia validación por herencia.
  */
  static isValidNumber(number: number) {
    const regex = /^\d{8}(?:[-\s]\d{4})?$/;
    return regex.test(number.toString());
  }

  getType() {
    return this.type;
  }

  getNumber() {
    return this.number;
  }
}
