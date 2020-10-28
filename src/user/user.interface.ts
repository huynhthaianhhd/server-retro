import { BoardEntity } from './../board/board.entity';
export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  boards: BoardEntity[];
}
