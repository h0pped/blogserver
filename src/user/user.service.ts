import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return { users };
  }

  async createTestUser() {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: 'notawril1@gmail.com',
          hashedPassword: '123123',
          name: 'test',
          surname: 'user',
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
