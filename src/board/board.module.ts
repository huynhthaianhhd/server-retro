import { ColumnModule } from './../column/column.module';
import { ColumnEntity } from './../column/column.entity';
import { UserModule } from './../user/user.module';
import { UserEntity } from './../user/user.entity';
import { BoardEntity } from './board.entity';
import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../user/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity, UserEntity, ColumnEntity]),
    UserModule,
    ColumnModule,
  ],
  providers: [BoardService],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'board/update', method: RequestMethod.POST },
        { path: 'board/delete', method: RequestMethod.POST },
        {path: 'board/create', method: RequestMethod.POST}, 
      );
  }
}
