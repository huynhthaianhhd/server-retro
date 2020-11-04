import { TagService } from './tag.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post('create')
    async create(@Body() tag : {tagname : string, columnId : number}) {
        return this.tagService.create(tag);
    }
    @Get()
    async getAllTagByTypeAndBoardId(@Query('boardId',ParseIntPipe) boardId: number, @Query('type',ParseIntPipe) type: number): Promise<Object> {
    return await this.tagService.findAllByBoardId(boardId,type);
    }
    @Post('update')
    async update(@Body() tag : {id:number , tagname:string}) {
      return await this.tagService.update(tag);
    }
    @Post('delete')
    async delete(@Body() id : number) {
      return await this.tagService.delete(id);
    }
}
