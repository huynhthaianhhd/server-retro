import { BoardEntity } from './../board/board.entity';
import { Entity , Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(()=> BoardEntity, board => board.user)
    boards: BoardEntity[];
}
