import { ColumnEntity } from './../column/column.entity';
import { UserEntity } from './../user/user.entity';
import { Entity , Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('board')
export class BoardEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardname: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column()
  isdelete: boolean;

  @ManyToOne(() => UserEntity, user => user.boards)
    user: UserEntity;

  @OneToMany(()=> ColumnEntity, column => column.board)
    columns: ColumnEntity[];

}
