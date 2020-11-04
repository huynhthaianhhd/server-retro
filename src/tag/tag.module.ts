import { ColumnModule } from './../column/column.module';
import { ColumnEntity } from './../column/column.entity';

import { TagEntity } from './tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, ColumnEntity]),TagModule,ColumnModule],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule {}
