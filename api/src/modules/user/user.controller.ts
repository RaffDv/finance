import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract } from '@finance/contract';
import { JwtGuard } from '../auth/guard/jwt.guard';
const { user } = contract;
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @TsRestHandler(user.getUserProfile)
  findOne() {
    return tsRestHandler(user.getUserProfile, async ({ params }) => {
      const response = await this.userService.getUserProfile(params.id);

      if (response instanceof BadRequestException)
        return {
          status: 404,
          body: {
            code: response.message,
            message: response.cause as string,
          },
        };

      return {
        status: 200,
        body: {
          message: 'user find',
          data: {
            id: response.id,
            username: response.username,
            name: response.name,
          },
        },
      };
    });
  }
}
