import { Entity , Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('board')
export class BoardEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardname: string;

  @Column()
  userid: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column()
  isdelete: boolean;

}
