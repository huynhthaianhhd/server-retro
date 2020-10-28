import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRO, UserData } from './user.interface';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
   async create(): Promise<String> {
    return 'hello';
  }
}
