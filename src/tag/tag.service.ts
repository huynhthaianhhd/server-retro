import { BoardEntity } from './../board/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { log } from 'console';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
        @InjectRepository(ColumnEntity)
        private readonly columnRepository: Repository<ColumnEntity>,
      ) {}
    async create(tag : {tagname : string, columnId: number}): Promise<TagEntity>{
        const tagCreated = new TagEntity();
        tagCreated.tagname = tag.tagname;
        tagCreated.isdelete = false;
        
        const newTag = await this.tagRepository.save(tagCreated);
        
        const column = await this.columnRepository.findOne({ where: { id: tag.columnId }, relations: ['tags'] });
        column.tags.push(tagCreated);

        await this.columnRepository.save(column);
        return newTag;
    }
    async update(tag): Promise<TagEntity> {
        let toUpdate = await this.tagRepository.findOne(tag.id);
        let updated = Object.assign(toUpdate, {tagname: tag.tagname});
       
        return await this.tagRepository.save(updated);
    }
    async delete(id: number): Promise<TagEntity> {
        let toUpdate = await this.tagRepository.findOne(id);
        let updated = Object.assign(toUpdate, {isdelete: true});
        return await this.tagRepository.save(updated);
    }
    
    async findAllByBoardId(boardId : number, type : number): Promise<Object> {
        const column = await getRepository(ColumnEntity)
        .createQueryBuilder("column")
        .leftJoinAndSelect("column.tags", "tag")
        .where("column.boardId = :id", { id: boardId })
        .andWhere("column.typeColumn = :type", { type: type })
        .andWhere("tag.isdelete = false");
        let result = await column.getOne();
        if (!result){
            const tag = await getRepository(ColumnEntity)
            .createQueryBuilder("column")
            .leftJoinAndSelect("column.tags", "tag")
            .where("column.boardId = :id", { id: boardId })
            .andWhere("column.typeColumn = :type", { type: type })
            const kq = await tag.getOne();
            return {
                tags : [],
                id : kq.id
            };
        }
        return result;
    }
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
