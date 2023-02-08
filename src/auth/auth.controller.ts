import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UserSignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signIn')
  @HttpCode(200)
  signIn(@Body() authDto: AuthDto) {
    return this.auth.signIn(authDto);
  }

  @Post('signUp')
  @HttpCode(200)
  signUp(@Body() authDto: UserSignUpDto) {
    return this.auth.signUp(authDto);
  }
}
