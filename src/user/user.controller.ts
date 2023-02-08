import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUser(): { message: string } {
    return { message: 'Hello World!' };
  }
}
