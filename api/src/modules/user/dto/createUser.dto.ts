import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, {
    message: 'the name must have 3 letters',
  })
  @IsString()
  name: string;

  @MinLength(5, { message: 'the username must have 5 letters' })
  @IsString()
  username: string;

  @MinLength(6, {
    message: 'the password must have 6 letters',
  })
  @IsString()
  password: string;
}
