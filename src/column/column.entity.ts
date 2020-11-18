import { TagEntity } from './../tag/tag.entity';
import { BoardEntity } from './../board/board.entity';
import { Entity , Column, PrimaryColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity('column')
export class ColumnEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  typeColumn: number;

  @Column()
  isdelete: boolean;
  
  @ManyToOne(() => BoardEntity, board => board.columns)
    board: BoardEntity;
  @OneToMany(()=> TagEntity, tag => tag.column)
    tags: TagEntity[];
}
