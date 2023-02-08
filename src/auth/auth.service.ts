import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UserSignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await argon.verify(user.hashedPassword, password))) {
      throw new NotFoundException("User with such credentials doesn't exist");
    }

    delete user.hashedPassword;
    return user;
  }

  async signUp(authDto: UserSignUpDto) {
    const { email, password, name, surname } = authDto;
    try {
      const hashedPassword = await argon.hash(password);

      const user = await this.prisma.user.create({
        data: {
          email,
          hashedPassword,
          name,
          surname,
        },
        select: {
          email: true,
          name: true,
          surname: true,
          createdAt: true,
        },
      });

      return user;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ForbiddenException('Email already in use');
      }
    }
  }
}
