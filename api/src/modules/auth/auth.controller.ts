import {
  ConflictException,
  Controller,
  InternalServerErrorException,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract as c } from '@finance/contract';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { RefreshJwtGuard } from './guard/refreshJwt.guard';

const { auth } = c;

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRestHandler(auth.register)
  register() {
    return tsRestHandler(auth.register, async ({ body }) => {
      const response = await this.authService.register(body);

      if (response instanceof Prisma.PrismaClientKnownRequestError)
        return {
          status: 400,
          body: {
            code: response.code,
            message: response.message,
          },
        };

      if (response instanceof ConflictException)
        return {
          status: 409,
          body: {
            code: response.message,
            message: response.cause as string,
          },
        };

      if (response instanceof InternalServerErrorException)
        return {
          status: 500,
          body: {
            code: response.message,
            message: response.cause as string,
          },
        };

      return {
        status: 201,
        body: {
          message: response.message,
        },
      };
    });
  }

  @TsRestHandler(auth.login)
  login() {
    return tsRestHandler(auth.login, async ({ body }) => {
      const response = await this.authService.login(body);

      if (response instanceof UnauthorizedException)
        return {
          status: 401,
          body: {
            code: response.message,
            message: response.cause as string,
          },
        };

      return {
        status: 200,
        body: {
          message: response.message,
          data: response.data,
        },
      };
    });
  }

  @UseGuards(RefreshJwtGuard)
  @TsRestHandler(auth.refresh)
  refreshToken(@Req() req) {
    return tsRestHandler(auth.refresh, async () => {
      const resp = await this.authService.refreshToken(req.user);
      return {
        status: 200,
        body: {
          message: 'token refreshed',
          data: resp,
        },
      };
    });
  }
}
