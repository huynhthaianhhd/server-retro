import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}