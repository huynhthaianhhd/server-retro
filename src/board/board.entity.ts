import { ColumnEntity } from './../column/column.entity';
import { UserEntity } from './../user/user.entity';
import { Entity , Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('board')
export class BoardEntity {

  @PrimaryColumn()
  id: string;

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
