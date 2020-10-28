import { ColumnEntity } from './../column/column.entity';
import { Entity , Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('tag')
export class TagEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagname: string;

  @Column()
  isdelete: boolean;

  @ManyToOne(() => ColumnEntity, column => column.tags)
    column: ColumnEntity;
}
