import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { errorMessages } from '../../../domain/exceptions/error.messages';
export class AddUserDto {
  @IsEmail()
  readonly email: string;

  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: errorMessages.invalidPassword,
  })
  readonly password: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly surname: string;

  @IsNotEmpty()
  readonly document: {
    type: string;
    number: number;
  };
}
