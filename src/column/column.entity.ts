import { Entity , Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('column')
export class ColumnEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardid: string;

  @Column()
  columnname: string;

  @Column()
  isdelete: boolean;
  
}
