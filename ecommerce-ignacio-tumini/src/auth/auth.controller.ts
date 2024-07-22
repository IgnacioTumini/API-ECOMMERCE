import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserPipeDto } from '../users/user.pipes.dto';
import { LoginPipeDto } from './login.pipes.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up user',
    description: 'Recibe por body el usuario y retorna el usuario',
  })
  @HttpCode(201)
  async singUp(@Body() user: UserPipeDto): Promise<any> {
    return await this.authService.signUp(user);
  }
  @Post('signin')
  @ApiOperation({
    summary: 'Sign in user',
    description: 'Recibe por el body el email y el password y retorna el token',
  })
  @HttpCode(201)
  async singIn(@Body() login: LoginPipeDto): Promise<any> {
    return await this.authService.signIn(login);
  }
}
