import { TagService } from './tag.service';
import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, Req } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { TagList } from './tag-list.dto';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post('create')
    async create(@Body() tag : {id: string, tagname : string, columnId : string}) {
        return this.tagService.create(tag);
    }
    @Post('create-list')
    async createList(@Body() board : any) {
      console.log('aa',board[2]);
        return this.tagService.createList(board);
    }
    @Get()
    async getAllTagByTypeAndBoardId(@Query('boardId',ParseUUIDPipe) boardId: string, @Query('type',ParseIntPipe) type: number): Promise<Object> {
    return await this.tagService.findAllByBoardId(boardId,type);
    }
    @Post('update')
    async update(@Body() tag : {id:string , tagname:string}) {
      return await this.tagService.update(tag);
    }
    @Post('delete')
    async delete(@Body() id : string) {
      return await this.tagService.delete(id);
    }
    @Post('delete-tag')
    async deleteTag(@Body() id : string) {
      return await this.tagService.deleteTag(id);
    }
}
