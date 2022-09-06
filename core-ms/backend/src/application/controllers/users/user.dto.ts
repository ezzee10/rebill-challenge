export class AddUserDto {
  readonly email: string;
  readonly name: string;
  readonly surname: string;
  readonly document: {
    type: string;
    number: number;
  };
}
