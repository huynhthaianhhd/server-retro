import { BoardEntity } from './../board/board.entity';
import { Entity , Column, PrimaryGeneratedColumn, OneToMany,BeforeInsert} from 'typeorm';
import * as argon2 from 'argon2';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(()=> BoardEntity, board => board.user)
    boards: BoardEntity[];
}
