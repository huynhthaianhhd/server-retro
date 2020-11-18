
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
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.interface';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
  @Get(':id')
  async getUser(@Param() params) {
    return this.userService.findById(params.id);
  }
  @Post('update')
  async update(@Body() user: any): Promise<Object> {
    const _user = await this.userService.update(user);
    return _user;
  }
  @Post('update-pass')
  async updatePassword(@Body() user: any): Promise<Object> {
    console.log('user',user);
    const _user = await this.userService.updatePassword(user);
    return _user;
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = {User: ' not found'};
    if (!_user) throw new HttpException({errors}, 401);

    const token = await this.userService.generateJWT(_user);
    const {email, name, id} = _user;
    const user = {id, email, name , token};
    return user;
  }

}
