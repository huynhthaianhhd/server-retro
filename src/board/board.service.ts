
import { BoardEntity } from './board.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { log } from 'console';
import { ColumnEntity } from 'src/column/column.entity';
@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ColumnEntity)
        private readonly columnRepository: Repository<ColumnEntity>,
      ) {}
    async create(board : {boardname : string, userId: number}): Promise<BoardEntity>{
        const boardCreated = new BoardEntity();
        boardCreated.boardname = board.boardname;
        boardCreated.isdelete = false;
        
        const newBoard = await this.boardRepository.save(boardCreated);
        
        const user = await this.userRepository.findOne({ where: { id: board.userId }, relations: ['boards'] });
        user.boards.push(boardCreated);

        await this.userRepository.save(user);
        await this.createColumn({typeColumn:1, boardId:newBoard.id});
        await this.createColumn({typeColumn:2, boardId:newBoard.id});
        await this.createColumn({typeColumn:3, boardId:newBoard.id});
        return newBoard;
    }
    async createColumn(column : {typeColumn : number, boardId: number}): Promise<BoardEntity>{
        
        const columnCreated = new ColumnEntity();
        columnCreated.typeColumn = column.typeColumn;
        columnCreated.isdelete = false;

        const newColumn = await this.columnRepository.save(columnCreated);

        const board = await this.boardRepository.findOne({ where: { id: column.boardId }, relations: ['columns'] });
        board.columns.push(columnCreated);

        await this.boardRepository.save(board);

        return board;
    }
    async findAll(userId : number): Promise<Object> {
        const column = await getRepository(UserEntity)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.boards", "board")
        .where("user.id = :id", { id: userId })
        .andWhere("board.isdelete = false")
        const result = await column.getOne();
        return result;
    }
    async findById(id: number): Promise<BoardEntity>{
        const board = await this.boardRepository.findOne(id);
        return board;
      }
    async update(board): Promise<BoardEntity> {
        let toUpdate = await this.boardRepository.findOne(board.id);
        let updated = Object.assign(toUpdate, {boardname: board.boardname});
       
        return await this.boardRepository.save(updated);
    }
    async delete(id: number): Promise<BoardEntity> {
        let toUpdate = await this.boardRepository.findOne(id);
        let updated = Object.assign(toUpdate, {isdelete: true});
        return await this.boardRepository.save(updated);
    }
    
}
