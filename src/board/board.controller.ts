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
  } from '@nestjs/common';
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

  @Get()
   async getAllBoard(@Query('userId',ParseIntPipe) userId: number): Promise<Object> {
    return await this.boardService.findAll(userId);
  }
  @Get(':id')
  async getBoard(@Param() params) {
    return this.boardService.findById(params.id);
  }
  @Post('create')
  async create(@Body() board : {boardname : string, userId : number}) {
    return this.boardService.create(board);
  }
  @Post('update')
  async update(@Body() board : {id:number , boardname:string}) {
    return await this.boardService.update(board);
  }
  @Post('delete')
  async delete(@Body() id : number) {
    return await this.boardService.delete(id);
  }
}
