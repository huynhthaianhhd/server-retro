import { User } from './user.interface';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';

import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
import { log } from 'console';
const jwt = require('jsonwebtoken');
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(dto: CreateUserDto): Promise<User> {
    // check uniqueness of username/email
    const { email, password, name, id } = dto;
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    let newUser = new UserEntity();
    newUser.id = id;
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async update(user: any): Promise<Object> {
    const email = user.email;
    const userToUpdate = await this.userRepository.findOne({email});
    let updated = Object.assign(userToUpdate, { name: user.name });
    const userGet = await this.userRepository.save(updated);
    return this.buildUserRO(userGet);
  }
  async updatePassword(user: any): Promise<Object> {
    console.log('b',user);
    const email = user.email;
    const userToUpdate = await this.userRepository.findOne({ email });
    if (await argon2.verify(userToUpdate.password, user.password)) {
      const newPass = await argon2.hash(user.newPassword)
      let updated = Object.assign(userToUpdate, {
        name: user.name,
        password: newPass,
      });
      const userGet = await this.userRepository.save(updated);
      return this.buildUserRO(userGet);
    } else return null;
  }

  async findOne({ email, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async findById(id: string): Promise<Object> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      const errors = { User: ' not found' };
      return null;
    }
    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email });
    return this.buildUserRO(user);
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      'secret-key',
    );
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      email: user.email,
      name: user.name,
      token: this.generateJWT(user),
    };
    return userRO;
  }
}
