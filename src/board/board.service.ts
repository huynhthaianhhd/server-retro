import { BoardEntity } from './board.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>
      ) {}
    async create(board : BoardEntity): Promise<BoardEntity>{
        return await this.boardRepository.save(board);
    }
    async findAll(): Promise<BoardEntity[]> {
        return await this.boardRepository.find();
    }
}
