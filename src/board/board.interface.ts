import { ColumnEntity } from './../column/column.entity';
import { UserEntity } from './../user/user.entity';

export interface Board {
  id?: number;
  boardname?: string;
  create?: string;
  isDelete?: string;
  user: UserEntity;
  columns:ColumnEntity[];
}
