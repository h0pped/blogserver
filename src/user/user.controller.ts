import { Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getUsers(): Promise<{ users: Array<UserDto> }> {
    return this.userService.getUsers();
  }

  @Post('createTest')
  createTestUser() {
    return this.userService.createTestUser();
  }
}
