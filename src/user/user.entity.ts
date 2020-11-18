import { BoardEntity } from './../board/board.entity';
import { Entity , Column, PrimaryColumn, OneToMany,BeforeInsert} from 'typeorm';
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {

  @PrimaryColumn()
  id: string;

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
