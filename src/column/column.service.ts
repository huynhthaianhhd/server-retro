
import { ColumnEntity } from './column.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity)
        private readonly columnRepository: Repository<ColumnEntity>,
      ) {}
    
    // async findAll(): Promise<BoardEntity[]> {
    //     return await this.boardRepository.find({isdelete: false});
    // }
    // async update(board): Promise<BoardEntity> {
    //     let toUpdate = await this.boardRepository.findOne(board.id);
    //     let updated = Object.assign(toUpdate, {boardname: board.boardname, created:board.created});
       
    //     return await this.boardRepository.save(updated);
    // }
    // async delete(id: number): Promise<BoardEntity> {
    //     let toUpdate = await this.boardRepository.findOne(id);
    //     let updated = Object.assign(toUpdate, {isdelete: true});
    //     return await this.boardRepository.save(updated);
    // }
}
