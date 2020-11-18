import { TagEntity } from './tag.entity';
import { IsNotEmpty } from 'class-validator';
import { Tag } from './tag.interface';

export class TagList {

  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly tasks: Tag[];
}