export interface IException {
  functionalException(data: string): void;
  badRequestException(data: string): void;
  unauthorizedException(data: string): void;
}
