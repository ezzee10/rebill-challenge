import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddUserDto } from './user.dto';
import { UseCasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { AddUserUseCase } from '../../usescases/users/addUser.usecases';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UseCasesProxyModule.ADD_USER_USECASES_PROXY)
    private readonly addUserUseCase: UseCaseProxy<AddUserUseCase>,
  ) {}

  @Post('signup')
  async addUser(@Body() addUserDto: AddUserDto) {
    const { email, name, surname, document } = addUserDto;

    const userCreated = await this.addUserUseCase
      .getInstance()
      .execute(email, name, surname, document);

    // TODO: CREAR CAPA DE PRESENTACIÓN
    return {
      email: userCreated.getEmail().getUserEmail(),
      name: userCreated.getName(),
      surname: userCreated.getSurname(),
      document: {
        type: userCreated.getDocument().getType(),
        number: userCreated.getDocument().getNumber(),
      },
    };
  }
}
