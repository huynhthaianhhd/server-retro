import { TagEntity } from './../tag/tag.entity';
import { BoardEntity } from './../board/board.entity';
export interface Column {
    id?: string;
    columnname?: string;
    isDelete?: string;
    board: BoardEntity;
  }