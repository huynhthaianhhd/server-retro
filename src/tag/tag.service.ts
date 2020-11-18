import { BoardEntity } from './../board/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { log } from 'console';
import { TagList } from './tag-list.dto';
import { isEmpty } from 'class-validator';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}
  async getTags(columnId: string): Promise<any>{
    const column = await getRepository(TagEntity)
    .createQueryBuilder("tag")
    .leftJoinAndSelect("tag.column", "column")
    .where("column.id = :id", { id: columnId })
    .orderBy("tag.order", "DESC");
    let result = await column.getOne();
    return result;
  }
  async create(tag: {
    id: string;
    tagname: string;
    columnId: string;
  }): Promise<TagEntity> {
    const getTag = await this.getTags(tag.columnId);
    let order = 0;
    console.log(getTag);
    if (!isEmpty(getTag)){
        order = getTag.order + 1;
    }
    const tagCreated = new TagEntity();
    tagCreated.tagname = tag.tagname;
    tagCreated.order = order;
    const newTag = await this.tagRepository.save(tagCreated);
    const column = await this.columnRepository.findOne({
      where: { id: tag.columnId },
      relations: ['tags'],
    });
    column.tags.push(tagCreated);

    await this.columnRepository.save(column);
    return newTag;
  }
  async createList(
    board : any
  ): Promise<TagEntity> {
      let columnWentWell =board[0].tasks;
      let columnImprove =board[1].tasks;
      let columnAction =board[2].tasks;
      
    for (let index = 0; index < columnWentWell.length; index++) {
      const tagCreated = new TagEntity();
      tagCreated.id =columnWentWell[index].id;
      tagCreated.order =columnWentWell[index].order;
      tagCreated.tagname = columnWentWell[index].tagname;

      const checkTag = await this.tagRepository.findOne(tagCreated.id);
      if (checkTag){
        await this.tagRepository.delete(tagCreated.id);
      }
      const newTag = await this.tagRepository.save(tagCreated);
      const column = await this.columnRepository.findOne({
        where: { id: board[0].id },
        relations: ['tags'],
      });
      column.tags.push(tagCreated);

      await this.columnRepository.save(column);
    }
    for (let index = 0; index < columnImprove.length; index++) {
        const tagCreated = new TagEntity();
        tagCreated.id =columnImprove[index].id;
        tagCreated.order =columnWentWell[index].order;
        tagCreated.tagname = columnImprove[index].tagname;
  
        const checkTag = await this.tagRepository.findOne(tagCreated.id);
        if (checkTag){
          await this.tagRepository.delete(tagCreated.id);
        }
        const newTag = await this.tagRepository.save(tagCreated);
        const column = await this.columnRepository.findOne({
          where: { id: board[1].id },
          relations: ['tags'],
        });
        column.tags.push(tagCreated);
  
        await this.columnRepository.save(column);
      }
      for (let index = 0; index < columnAction.length; index++) {
        const tagCreated = new TagEntity();
        tagCreated.id =columnAction[index].id;
        tagCreated.order =columnWentWell[index].order;
        tagCreated.tagname = columnAction[index].tagname;
  
        const checkTag = await this.tagRepository.findOne(tagCreated.id);
        if (checkTag){
          await this.tagRepository.delete(tagCreated.id);
        }
        const newTag = await this.tagRepository.save(tagCreated);
        const column = await this.columnRepository.findOne({
          where: { id: board[2].id },
          relations: ['tags'],
        });
        column.tags.push(tagCreated);
  
        await this.columnRepository.save(column);
      }
    // return newTag;
    return;
  }
  async update(tag): Promise<TagEntity> {
    let toUpdate = await this.tagRepository.findOne(tag.id);
    let updated = Object.assign(toUpdate, { tagname: tag.tagname });

    return await this.tagRepository.save(updated);
  }
  async delete(id: string): Promise<Object> {
    return await this.tagRepository.delete(id);
  }
  async deleteTag(id: string): Promise<Object> {
    return await this.tagRepository.delete(id);
  }

  async findAllByBoardId(boardId: string, type: number): Promise<Object> {
    const column = await getRepository(ColumnEntity)
    .createQueryBuilder("column")
    .leftJoinAndSelect("column.tags", "tag")
    .where("column.boardId = :id", { id: boardId })
    .andWhere("column.typeColumn = :type", { type: type })
    .orderBy("tag.order", "ASC");
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
    // const column = await getRepository(ColumnEntity)
    // .createQueryBuilder("column")
    // .leftJoinAndSelect("column.tags", "tag")
    // .where("column.boardId = :id", { id: boardId })
    // .andWhere("column.typeColumn = :type", { type: type })
    // .andWhere("tag.isdelete = false")
    // .orderBy("tag.created", "ASC");

    // const tag = await getRepository(TagEntity)
    //   .createQueryBuilder('tag')
    //   .leftJoinAndSelect('tag.column', 'column')
    //   .where('column.boardId = :id', { id: boardId })
    //   .andWhere('column.typeColumn = :type', { type: type })
    //   .andWhere('tag.isdelete = false');
    // // .orderBy("tag.created", "ASC");
    // let result = await tag.getMany();
    // console.log(tag.getQuery());
    // if (result.length === 0) {
    //   const column = await getRepository(ColumnEntity)
    //     .createQueryBuilder('column')
    //     .leftJoinAndSelect('column.tags', 'tag')
    //     .where('column.boardId = :id', { id: boardId })
    //     .andWhere('column.typeColumn = :type', { type: type });
    //   const kq = await column.getOne();
    //   return [
    //     {
    //       column: {
    //         id: kq.id,
    //       },
    //     },
    //   ];
    // }
    // console.log({ result });
    // return result;
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
