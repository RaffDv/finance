import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/createUser.dto';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { ErrorDictionary } from 'utils/errorDictionary';
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
        throw new ConflictException(ErrorDictionary.Auth.A1000.cause, {
          cause: ErrorDictionary.Auth.A1000.message,
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
          code: ErrorDictionary.User.U0001.cause,
          message: ErrorDictionary.User.U0001.message,
        };
      if (err instanceof ConflictException) {
        return err;
      }

      return new InternalServerErrorException(
        ErrorDictionary.General.E1500.cause,
        {
          cause: ErrorDictionary.General.E1500.message,
        },
      );
    }
  }
  async findOne(username: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      if (!user)
        throw new NotFoundException(ErrorDictionary.User.U0003.cause, {
          cause: ErrorDictionary.User.U0003.message,
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
        throw new NotFoundException(ErrorDictionary.User.U0003.cause, {
          cause: ErrorDictionary.User.U0003.message,
        });
      return user;
    } catch (err) {
      return err;
    }
  }
}
