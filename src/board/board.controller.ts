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
  } from '@nestjs/common';
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

  @Get()
   async getAllBoard(): Promise<Object> {
    return await this.boardService.findAll();
  }
}
