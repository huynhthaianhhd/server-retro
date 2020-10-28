import { Entity , Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class TagEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagname: string;

  @Column()
  isdelete: boolean;

}
