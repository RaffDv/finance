import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { log } from 'console';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const resp = await this.userService.crate(dto);
    log(resp);
    return resp;
  }

  async login(dto: LoginDto) {
    console.log(dto);

    const result = await this.validateUser(dto);

    if (result instanceof UnauthorizedException) return result;

    const payload = {
      id: result.id,
      sub: {
        username: result.username,
        name: result.name,
      },
    };
    return {
      message: 'login successfull',
      data: {
        user: result,
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret: process.env.JWT_ACCESS_SECRET,
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_SECRET,
        }),
      },
    };
  }
  async validateUser(dto: LoginDto) {
    const user = await this.userService.findOne(dto.username);
    console.log(user);

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return new UnauthorizedException('A1000 - invalid credentials', {
      cause: 'username and password are incorrect',
    });
  }

  async refreshToken(userPayload: any) {
    const payload = {
      username: userPayload.username,
      sub: userPayload.sub,
    };

    return {
      data: {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '20s',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        }),
      },
    };
  }
}
