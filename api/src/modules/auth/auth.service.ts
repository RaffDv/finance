import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { log } from 'console';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: CreateUserDto) {
    const resp = await this.userService.crate(dto);
    log(resp);
    return resp;
  }

  async login(dto: LoginDto) {
    const result = await this.validateUser(dto);

    if (result instanceof UnauthorizedException) return result;
    return {
      message: 'logged',
      data: {
        token: 'JWT-token',
      },
    };
  }
  async validateUser(dto: LoginDto) {
    const user = await this.userService.findOne(dto.username);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return new UnauthorizedException('A1000 - invalid credentials', {
      cause: 'username and password are incorrect',
    });
  }
}
