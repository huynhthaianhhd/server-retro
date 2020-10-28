import { TagEntity } from './../tag/tag.entity';
import { BoardEntity } from './../board/board.entity';
import { Entity , Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity('column')
export class ColumnEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  columnname: string;

  @Column()
  isdelete: boolean;
  
  @ManyToOne(() => BoardEntity, board => board.columns)
    board: BoardEntity;

  @OneToMany(()=> TagEntity, tag => tag.column)
    tags: TagEntity[];
}
