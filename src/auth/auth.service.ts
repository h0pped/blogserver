import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException("User with such credentials doesn't exist");
    }
    if (user.hashedPassword !== password) {
      throw new NotFoundException("User with such credentials doesn't exist");
    }

    delete user.hashedPassword;
    return user;
  }
}
