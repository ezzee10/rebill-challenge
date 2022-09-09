import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserLoginDto } from './user.login.dto';
import { UseCasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { LoginUserUseCase } from '../../usescases/auth/loginUser.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY)
    private readonly loginUserUseCase: UseCaseProxy<LoginUserUseCase>,
  ) {}

  @Post('login')
  async loginUser(@Body() userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;

      const loginResponse = await this.loginUserUseCase
        .getInstance()
        .execute(email, password);

      return loginResponse;

  }
}
