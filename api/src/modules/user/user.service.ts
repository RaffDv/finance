import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/createUser.dto';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async crate(dto: CreateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });

      if (user)
        throw new ConflictException('U0002 - user already exists', {
          cause: 'the chosen username is already in use',
        });

      await this.prisma.user.create({
        data: {
          ...dto,
          password: await hash(dto.password, 10),
        },
      });

      return {
        message: 'user has been crated!',
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError)
        return {
          code: 'U0001 - Data Provided is incorrect',
          message: `${err.code} -${err.message.split('Unique')[1]}`,
        };
      if (err instanceof ConflictException) {
        return err;
      }

      return new InternalServerErrorException('E1500 - Not tracked error', {
        cause: 'unknown error',
      });
    }
  }
  async findOne(username: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      if (!user)
        throw new BadRequestException('U0003 - User not found', {
          cause: 'username provided not exists',
        });

      return user;
    } catch (err) {
      return err;
    }
  }
  async getUserProfile(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user)
        throw new BadRequestException('U0003 - User not found', {
          cause: 'username provided not exists',
        });

      return user;
    } catch (err) {
      return err;
    }
  }
}
