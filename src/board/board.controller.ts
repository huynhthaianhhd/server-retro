import { Board } from './board.interface';
import { BoardService } from './board.service';
import {
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
    Controller,
    UsePipes,
    Query,
    ParseIntPipe,
    ParseUUIDPipe,
  } from '@nestjs/common';
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

  @Get('/user/:id')
   async getAllBoard(@Param() params) : Promise<Object> {
    return await this.boardService.findAll(params.id);
  }
  @Get(':id')
  async getBoard(@Param() params) {
    return this.boardService.findById(params.id);
  }
  @Post('create')
  async create(@Body() board : {id: string, boardname : string, userId : string}) {
    return this.boardService.create(board);
  }
  @Post('update')
  async update(@Body() board : {id:string , boardname:string}) {
    return await this.boardService.update(board);
  }
  @Post('delete')
  async delete(@Body() id : string) {
    return await this.boardService.delete(id);
  }
}
