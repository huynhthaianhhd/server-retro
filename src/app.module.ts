import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { TagModule } from './tag/tag.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), BoardModule, ColumnModule, TagModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})  
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
