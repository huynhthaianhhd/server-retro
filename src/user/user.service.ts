import { UserData, UserRO } from './user.interface';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
      ) {}
    async create(user : UserData): Promise<UserData>{
        return await this.userRepository.save(user);
    }
}
