import { TagEntity } from './../tag/tag.entity';
import { BoardEntity } from './../board/board.entity';
export interface Column {
    id?: number;
    columnname?: string;
    isDelete?: string;
    board: BoardEntity;
    tags: TagEntity[];
  }