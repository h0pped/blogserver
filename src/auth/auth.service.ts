import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UserSignUpDto } from './dto';

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

  async signUp(authDto: UserSignUpDto) {
    const { email, password, name, surname } = authDto;
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          hashedPassword: password,
          name,
          surname,
        },
      });
      delete user.hashedPassword;
      return user;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException('Email already in use');
      }
    }
  }
}
